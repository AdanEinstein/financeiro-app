import { useNavigation, useRoute } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import { NewScreenRouteProp, TabParamList } from "../../../routes/app.routes";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export default function useProducts() {
    const navigation = useNavigation<BottomTabNavigationProp<TabParamList, 'Novo'>>()
    const route = useRoute<NewScreenRouteProp>()
    const [produtos, setProdutos] = useState<Product[]>(route.params?.data?.produtos || []);

    useEffect(() => {
        navigation.addListener('focus', () => {
            route.params?.data ? setProdutos(route.params?.data.produtos) : setProdutos([])
        })
        navigation.addListener('blur', () => {
            setProdutos([])       
        })
    }, [navigation, route])

    const handleAdd = () => {
        setProdutos((oldProdutos) => {
            return [
                ...oldProdutos,
                {
                    codigo: "",
                    produto: undefined,
                    preco: "0,00",
                },
            ];
        });
    };

    const handleTrash = (index: number) => {
        setProdutos((oldProdutos) => {
            return oldProdutos.filter((_, i) => i !== index);
        });
    };

    const handleClear = useCallback(() => {
        setProdutos([])
    }, [produtos])

    return {
        produtos, setProdutos, handleAdd, handleTrash, handleClear
    }
}