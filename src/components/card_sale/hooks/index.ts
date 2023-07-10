import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { TabParamList } from "../../../routes/app.routes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { useCallback } from "react";

export default function useCardSale({sale, setUpdate}: { sale: Data, setUpdate: (...args: any) => void }){
    const navigation = useNavigation<BottomTabNavigationProp<TabParamList, 'Novo'>>()
    
    const handleSale = useCallback(() => {
        navigation.navigate("Novo", { data: sale });
    }, [sale]);

    const handlePagar = async () => {
        const newSale = sale;
        newSale.pago = true;
        const sls: Data[] = JSON.parse(await AsyncStorage.getItem("@sales:venda"));
        const newSls = sls.map((s) => {
            if (s.id == sale.id) return newSale;
            return s;
        });
        await AsyncStorage.setItem("@sales:venda", JSON.stringify(newSls));
        setUpdate(true);
    };

    const handleDespagar = async () => {
        const newSale = sale;
        newSale.pago = false;
        const sls: Data[] = JSON.parse(await AsyncStorage.getItem("@sales:venda"));
        const newSls = sls.map((s) => {
            if (s.id == sale.id) return newSale;
            return s;
        });
        await AsyncStorage.setItem("@sales:venda", JSON.stringify(newSls));
        setUpdate(true);
    };

    const handleDeletar = async () => {
        const sls: Data[] = JSON.parse(await AsyncStorage.getItem("@sales:venda"));
        const newSls = sls.filter((s) => s.id !== sale.id);
        await AsyncStorage.setItem("@sales:venda", JSON.stringify(newSls));
        setUpdate(true);
    };

    const handleJaPago = () => {
        Alert.alert("Lembrete", "Venda já estava paga :)");
    };
    
    return {
        handleSale, handlePagar, handleDespagar, handleDeletar, handleJaPago
    }
}