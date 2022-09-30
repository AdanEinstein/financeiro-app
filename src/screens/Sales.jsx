import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import stylesHome from "../styles/Home.styles.js";
import styles from "../styles/Sales.styles.js";
import stylesForm from "../components/form/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardSale from "../components/card_sale/index.jsx";
import { MaterialIcons } from "@expo/vector-icons";

export default function Sales({ route, navigation }) {
    //props.route.params
    const [sales, setSales] = useState([]);
    const [update, setUpdate] = useState(false);
    const [filter, setFilter] = useState("");
    const [total, setTotal] = useState("");

    useEffect(() => {
        async function getSales() {
            try {
                const slsString = await AsyncStorage.getItem("@sales:venda");
                const sls = JSON.parse(slsString);
                if (sls !== null) setSales(sls);
                else setSales([]);
            } catch {}
        }
        if (filter == "" || update == true) {
            setFilter("");
            getSales();
        }
        setUpdate(false);
    }, [route, update, filter]);

    useEffect(() => {
        const newTotal = sales
            .flatMap((s) =>
                parseFloat(
                    s.produtos.map((p) =>
                        p.preco.replace(".", "").replace(",", ".")
                    )
                )
            )
            ?.reduce((acc, p) => (acc += p), 0);
        setTotal(
            newTotal
                .toFixed(2)
                .replace(".", ",")
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
        );
    }, [sales]);

    const handleFilter = (e) => {
        let newSales = [];
        if (e.startsWith("#")) {
            const produto = e.replace("#", "");
            newSales = sales.filter((s) => {
                const newProdutos = s.produtos.filter((p) =>
                    p.codigo.startsWith(produto)
                );
                return newProdutos.length > 0 ? true : false;
            });
            setSales(newSales.length == 0 ? [] : newSales);
        } else {
            newSales = sales.filter((sale) => sale?.cliente?.startsWith(e));
            setSales(newSales.length == 0 ? [] : newSales);
        }
        setFilter(e);
    };

    return (
        <View style={styles.container}>
            <View style={stylesForm.topo}>
                <View style={stylesForm.selectTipo}>
                    <Text style={stylesForm.lblField}>Filtro:</Text>
                    <TextInput
                        style={stylesForm.txtInput}
                        value={filter}
                        onChangeText={handleFilter}
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
                <Text style={styles.totalP}>Total: R$ {total}</Text>
            </View>
            {sales.length !== 0 ? (
                <View style={{ flex: 1 }}>
                    <ScrollView nestedScrollEnabled={true}>
                        {sales.map((s) => {
                            return (
                                <CardSale
                                    key={s.id}
                                    sale={s}
                                    navigation={navigation}
                                    setUpdate={setUpdate}
                                />
                            );
                        })}
                    </ScrollView>
                </View>
            ) : (
                <View style={stylesHome.titleView}>
                    <Text style={stylesHome.title}>
                        Nenhuma venda encontrada 😩
                    </Text>
                    <Text style={stylesHome.subtitle}>
                        Mas não se preocupe.
                    </Text>
                    <Text style={stylesHome.subtitle}>
                        Você consegue, eu acredito em você 🙏
                    </Text>
                </View>
            )}
        </View>
    );
}
