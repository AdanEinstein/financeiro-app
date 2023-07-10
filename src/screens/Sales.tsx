import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import CardSale from "../components/card_sale";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { TabParamList } from "../routes/app.routes";
import styles from "../styles/Sales.styles";
import stylesForm from '../components/form/styles'
import stylesHome from '../styles/Home.styles'
import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { customFilter, isNegative } from "../utils";


export type SalesScreenRouteProp = RouteProp<TabParamList, 'Vendas'>;

export default function Sales() {
    const navigation = useNavigation<BottomTabNavigationProp<TabParamList, 'Vendas'>>()
    const [sales, setSales] = useState<Data[]>([]);
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        const getSales = async () => {
            const slsString = await AsyncStorage.getItem("@sales:venda");
            const sls = JSON.parse(slsString);
            if (sls) setSales(sls);
            else setSales([]);
        }
        navigation.addListener('focus', getSales)
        if (update || !filter) {
            getSales()
            setUpdate(false)
        }
        navigation.addListener('tabLongPress', (params) => {
            params.target.includes('Vendas') && Alert.alert('Tipos de filtros:', `
Iniciando com (#):\nBusca pelo código dos produtos\n
Iniciando com (*):\nBusca pela descrição dos produtos\n
Iniciando com (@):\nBusca pela categoria\n
Iniciando com (+):\nBusca por somente os já PAGOS\n
Iniciando com (-):\nBusca por somente os não PAGOS\n
Sem nada:\nBusca pelo cliente\n
            `)
        })
        navigation.addListener('blur', () => setFilter(''))
    }, [navigation, update, filter])

    const filtredSales = sales.filter(s => {
        let text = filter
        if (text.startsWith('+')) {
            text = text.replace('+', '')
            return s.pago && customFilter(text, s)
        } else if (text.startsWith('-')) {
            text = text.replace('-', '')
            return !s.pago && customFilter(text, s)
        } else {
            return customFilter(text, s)
        }
    })

    const total = filtredSales?.map((s) => {
        if (s.pago) return s.produtos.map(p => parseFloat(p.preco.replace(".", "").replace(",", "."))).reduce((acc, p) => acc += p)
        else return s.produtos.map(p => -parseFloat(p.preco.replace(".", "").replace(",", "."))).reduce((acc, p) => acc += p)
    })
        .reduce((acc, p) => (acc += p), 0) || 0;

    return (
        <View style={styles.container}>
            <View style={stylesForm.topo}>
                <View style={stylesForm.selectTipo}>
                    <Text style={stylesForm.lblField}>Filtro:</Text>
                    <TextInput
                        style={stylesForm.txtInput}
                        value={filter}
                        onChangeText={setFilter}
                        autoCapitalize="characters"
                    />
                </View>
                <Pressable onPress={(_) => setFilter("")}>
                    <View style={stylesForm.clear}>
                        <Text style={stylesForm.txtClear}>Limpar</Text>
                        <MaterialIcons name="clear" color="#FB0D34" size={25} />
                    </View>
                </Pressable>
            </View>
            <View style={styles.total}>
                <Text style={isNegative(total) ? styles.totalN : styles.totalP}>Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(total)}</Text>
            </View>
            {!!filtredSales?.length ? (
                <View style={{ flex: 1 }}>
                    <ScrollView nestedScrollEnabled={true}>
                        {filtredSales.map((s) => {
                            return (
                                <CardSale
                                    key={s.id}
                                    sale={s}
                                    setUpdate={setUpdate}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            ) : (
                <View style={stylesHome.titleView}>
                    <Text style={stylesHome.title}>
                        Nada para listar 😩
                    </Text>
                </View>
            )}
        </View>
    );
}
