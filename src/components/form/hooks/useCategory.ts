import { useEffect, useState } from "react";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { TabParamList } from "../../../routes/app.routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { schemaCategory } from "../validation";

export default function useCategory(){
    const [categorias, setCategorias] = useState<Category[]>([]);
    const [descricao, setDescricao] = useState("");
    const navigation = useNavigation<BottomTabNavigationProp<TabParamList, 'Vendas'>>()

    useEffect(() => {
        async function getCategorys() {
            const categorysString = await AsyncStorage.getItem(
                "@sales:categoria"
            );
            const categorys = JSON.parse(categorysString);
            if (!categorys) return
            setCategorias([...categorys]);
        }
        navigation.addListener('state', getCategorys)
    }, [navigation]);

    const handleCadastrarCategory = async () => {
        try {
            const hasCategory = categorias.filter(cat => cat.descricao == descricao).length
            if (hasCategory) {
                Alert.alert("Categoria já existe");
                return;
            }
            const id = categorias.length
            const category = { id, descricao }
            const parse = await schemaCategory.validate(category);
            await AsyncStorage.setItem(
                "@sales:categoria",
                JSON.stringify([...categorias, parse])
            )
            setCategorias(prev => [...prev, parse])
            Alert.alert("Sucesso", "Dado registrado com sucesso!");
            navigation.navigate("Vendas");
        } catch (error) {
            Alert.alert("Atenção", error.message);
            return;
        }
    }

    const handleRemoveCategory = async (id: number) => {
        const newCategorys = categorias.filter(cat => cat.id !== id)
        await AsyncStorage.setItem(
            "@sales:categoria",
            JSON.stringify([...newCategorys])
        );
        setCategorias(() => [...newCategorys])
    }
    
    return {
        descricao, setDescricao,
        categorias, handleCadastrarCategory, handleRemoveCategory
    }
}