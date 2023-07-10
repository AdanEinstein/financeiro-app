import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { schemaData } from "../validation";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NewScreenRouteProp, TabParamList } from "../../../routes/app.routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";


export default function useData(produtos: Product[]) {
    const navigation = useNavigation<BottomTabNavigationProp<TabParamList, 'Novo'>>()
    const route = useRoute<NewScreenRouteProp>()
    const [data, setData] = useState<Data>()

    useEffect(() => {
        navigation.addListener('focus', () => {
            route.params?.data ? setData(route.params?.data) : setData({
                cliente: "",
                contato: "",
                categoria: { descricao: "" },
                dataDaVenda: new Date(),
                dataParaPagar: new Date(),
                produtos: [],
                pago: false,
            })
        })
        navigation.addListener('blur', () => {
            setData({
                cliente: "",
                contato: "",
                categoria: { descricao: "" },
                dataDaVenda: new Date(),
                dataParaPagar: new Date(),
                produtos: [],
                pago: false,
            })       
            navigation.setParams({data: null})  
        })
    }, [navigation, route])

    const getSales = async () => {
        const salesString = await AsyncStorage.getItem("@sales:venda");
        const salesParsed = JSON.parse(salesString);
        if (!salesParsed) return []
        return [...salesParsed]
    }

    const handleCadastrar = useCallback(async () => {
        try {
            const newData: Data = {
                ...data,
                produtos,
            }
            let newSales = await getSales()
            if (route.params?.data?.id) {
                await schemaData.validate(newData);
                newSales = newSales.map((s) => {
                    if (s.id != data.id) return s;
                    return { ...newData, id: data.id };
                });
            } else {
                const id = newSales.length + 1
                await schemaData.validate({ ...newData, id });
                newSales = [...newSales, { ...newData, id }];
            }
            await AsyncStorage.setItem(
                "@sales:venda",
                JSON.stringify([...newSales])
            );
            Alert.alert("Sucesso", "Dado registrado com sucesso!");
            navigation.navigate("Vendas");
        } catch (error) {
            Alert.alert("Atenção", error.message);
            return;
        }
    }, [data, produtos])

    const handleClear = () => {
        setData({
            cliente: "",
            contato: "",
            categoria: { descricao: "" },
            dataDaVenda: new Date(),
            dataParaPagar: new Date(),
            produtos: [],
            pago: false,
        })
    };

    return {
        data, setData, handleCadastrar, handleClear
    }
}