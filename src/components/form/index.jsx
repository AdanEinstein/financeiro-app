import {
    Alert,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import { useCallback, useEffect, useState } from "react";
import { schemaCliente, schemaCategoria } from "./validation";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import { v4 } from "uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "react-native-get-random-values";

const FormNew = ({ navigation, data }) => {
    const [tipo, setTipo] = useState("sale");
    const [cliente, setCliente] = useState("");
    const [categorias, setCategorias] = useState([]);
    const [categoria, setCategoria] = useState(null);
    const [numero, setNumero] = useState("");
    const [dataDaVenda, setDataDaVenda] = useState(new Date());
    const [dataParaPagar, setDataParaPagar] = useState(new Date());
    const [produtos, setProdutos] = useState([]);
    const [descricao, setDescricao] = useState("");
    const [showVenda, setShowVenda] = useState(false);
    const [showPagar, setShowPagar] = useState(false);
    const [update, setUpdate] = useState(false);

    useEffect(() => {
        async function getCategorys() {
            try {
                const categorysString = await AsyncStorage.getItem(
                    "@sales:categoria"
                );
                const categorys = JSON.parse(categorysString);
                if (categorys !== null) {
                    setCategorias([...categorys]);
                    setCategoria(categorys[0].descricao);
                }
            } catch (error) { }
        }
        getCategorys();
    }, [tipo]);

    useEffect(() => {
        if (data) {
            setCliente(data?.cliente || "");
            setCategoria(data?.categoria || categorias[0]?.descricao || "");
            setNumero(data?.numero || "");
            setDataDaVenda(data?.dataDaVenda || new Date());
            setDataParaPagar(data?.dataParaPagar || new Date());
            setProdutos(data?.produtos || []);
            setDescricao("");
            setUpdate(true);
        }
    }, [data]);

    const handleCadastrar = async () => {
        const id = update ? data?.id : v4();
        const sale = {
            id,
            cliente,
            categoria,
            numero,
            dataDaVenda,
            dataParaPagar,
            produtos,
            pago: false,
        };
        try {
            await schemaCliente.validate(sale);
        } catch (error) {
            Alert.alert("Atenção", error.message);
            return;
        }

        try {
            const slsString = await AsyncStorage.getItem("@sales:venda");
            let sls = JSON.parse(slsString);
            if (sls == null) {
                await AsyncStorage.setItem(
                    "@sales:venda",
                    JSON.stringify([sale])
                );
            } else {
                if (update) {
                    sls = sls.map((s) => {
                        if (s.id == sale.id) {
                            return sale;
                        }
                        return s;
                    });
                } else {
                    sls.push(sale);
                }
                await AsyncStorage.setItem(
                    "@sales:venda",
                    JSON.stringify(sls)
                );
            }
            setCliente("");
            setNumero("");
            setProdutos([]);
            Alert.alert("Sucesso", "Dado registrado com sucesso!");
            navigation.navigate("Vendas", { update: true });
        } catch (error) {
            Alert.alert(
                "Ocorreu um erro",
                "Infelizmente não consegui cadastrar estes dados!"
            );
            return;
        }

    }

    const handleFormatPrice = (e, index) => {
        const val = e.replace(/\D/g, "");
        const valFixed = `${(parseInt(val) / 100).toFixed(2)}`;
        if (val.length < 18) {
            const result = valFixed
                .replace(".", ",")
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            setProdutos((oldProdutos) => {
                oldProdutos[index].preco = isNaN(parseInt(val) / 100)
                    ? "0,00"
                    : result;
                return [...oldProdutos];
            });
        }
    };

    const handleFormatCell = useCallback(
        (tel) => {
            tel = tel.replace(/\D/g, "");
            tel = tel.replace(/(.\d)/, "($1");
            tel = tel.replace(/(.{3})(\d)/, "$1)$2");
            if (tel.length == 9) {
                tel = tel.replace(/(.{1})$/, "-$1");
            } else if (tel.length == 10) {
                tel = tel.replace(/(.{2})$/, "-$1");
            } else if (tel.length == 11) {
                tel = tel.replace(/(.{3})$/, "-$1");
            } else if (tel.length == 12) {
                tel = tel.replace(/(.{4})$/, "-$1");
            } else if (tel.length == 13) {
                tel = tel.replace(/(.{4})$/, "-$1");
            } else if (tel.length > 13) {
                return;
            }
            setNumero(tel);
        },
        [numero]
    );

    const handleAdd = () => {
        if (produtos.length == 0) {
            setProdutos([
                {
                    codigo: "",
                    produto: undefined,
                    preco: undefined,
                },
            ]);
        } else {
            setProdutos((oldProdutos) => {
                setProdutos([
                    ...oldProdutos,
                    {
                        codigo: "",
                        produto: undefined,
                        preco: undefined,
                    },
                ]);
            });
        }
    };

    const handleTrash = (index) => {
        setProdutos((oldProdutos) => {
            return oldProdutos.filter((_, i) => i !== index);
        });
    };

    const handleCadastrarCategory = async () => {
        const id = v4()
        const category = {
            id,
            descricao,
        };
        try {
            await schemaCategoria.validate(category);
        } catch (error) {
            Alert.alert("Atenção", error.message);
            return;
        }

        try {
            const slsString = await AsyncStorage.getItem(
                "@sales:categoria"
            );
            const sls = JSON.parse(slsString);
            if (sls == null) {
                await AsyncStorage.setItem(
                    "@sales:categoria",
                    JSON.stringify([category])
                );
            } else {
                sls.push(category);
                await AsyncStorage.setItem(
                    "@sales:categoria",
                    JSON.stringify(sls)
                );
            }
            setDescricao("");
            setCategorias([...sls])
            Alert.alert("Sucesso", "Dado registrado com sucesso!");
            navigation.navigate("Vendas", { update: true });
        } catch (error) {
            Alert.alert(
                "Ocorreu um erro",
                "Infelizmente não consegui cadastrar estes dados!"
            );
            return;
        }
    }

    const handleRemoveCategory = async (id) => {
        const slsString = await AsyncStorage.getItem("@sales:categoria");
        let sls = JSON.parse(slsString);
        sls = sls.filter(c => c.id !== id)
        console.log(sls)

        await AsyncStorage.setItem(
            "@sales:categoria",
            JSON.stringify(sls)
        );
        setCategorias([...sls])
    }

    const handleClear = () => {
        setCliente("");
        setCategoria(categorias[0]?.descricao || "");
        setNumero("");
        setDataDaVenda(new Date());
        setDataParaPagar(new Date());
        setProdutos([]);
        setDescricao("");
        setUpdate(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topo}>
                <View style={styles.selectTipo}>
                    <Text style={styles.lblFieldTipo}>Tipo:</Text>
                    <Picker
                        style={styles.txtInputTipo}
                        prompt="Selecione o tipo de cadastro"
                        selectedValue={tipo}
                        onValueChange={setTipo}
                    >
                        <Picker.Item label="Venda" value="sale" />
                        <Picker.Item label="Categoria" value="category" />
                    </Picker>
                </View>
                <Pressable onPress={handleClear}>
                    <View style={styles.clear}>
                        <Text style={styles.txtClear}>Limpar</Text>
                        <MaterialIcons name="clear" color="#FB0D34" size={25} />
                    </View>
                </Pressable>
            </View>
            <View style={styles.borderBtn}></View>
            {tipo == "sale" ? (
                <ScrollView nestedScrollEnabled={true}>
                    <Text style={styles.lblField}>Cliente:</Text>
                    <TextInput
                        style={styles.txtInput}
                        value={cliente}
                        onChangeText={setCliente}
                        autoCapitalize="characters"
                    />
                    <Text style={styles.lblField}>Categoria:</Text>
                    <Picker
                        style={styles.txtInput}
                        prompt="Selecione a categoria"
                        selectedValue={categoria}
                        onValueChange={setCategoria}
                    >
                        {categorias.length !== 0 ? (
                            categorias.map((e) => {
                                return (
                                    <Picker.Item
                                        key={e.id}
                                        label={e.descricao}
                                        value={e.descricao}
                                    />
                                );
                            })
                        ) : (
                            <Picker.Item label="Nenhuma categoria cadastrada" />
                        )}
                    </Picker>
                    <Text style={styles.lblField}>Número de Telefone:</Text>
                    <TextInput
                        style={styles.txtInput}
                        value={numero}
                        onChangeText={handleFormatCell}
                        autoCapitalize="characters"
                        keyboardType="phone-pad"
                        placeholder="(11)95555-5555"
                    />
                    <View style={styles.viewCal}>
                        <Text style={styles.lblField}>Data da venda:</Text>
                        <Text style={styles.dateInput}>
                            {moment(dataDaVenda).format("DD/MM/YYYY")}
                        </Text>
                        <MaterialIcons
                            style={styles.btnCalen}
                            name="calendar-today"
                            color="#E0D10E"
                            size={25}
                            onPress={(e) => setShowVenda(true)}
                        />
                    </View>
                    {showVenda && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode="date"
                            onChange={(e, newDate) => {
                                setDataDaVenda(newDate);
                                setShowVenda(false);
                            }}
                        />
                    )}
                    <View style={styles.viewCal}>
                        <Text style={styles.lblField}>Data para pagar:</Text>
                        <Text style={styles.dateInput}>
                            {moment(dataParaPagar).format("DD/MM/YYYY")}
                        </Text>
                        <MaterialIcons
                            style={styles.btnCalen}
                            name="calendar-today"
                            color="#E0D10E"
                            size={25}
                            onPress={(e) => setShowPagar(true)}
                        />
                    </View>
                    {showPagar && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode="date"
                            onChange={(e, newDate) => {
                                setDataParaPagar(newDate);
                                setShowPagar(false);
                            }}
                        />
                    )}
                    <Pressable style={styles.separador} onPress={handleAdd}>
                        <Text style={styles.btnAdicionar}>
                            Adicionar produto
                            <MaterialIcons name="add" color="#FFF" size={25} />
                        </Text>
                    </Pressable>
                    {produtos.length > 0 &&
                        produtos.map(({ codigo, produto, preco }, index) => {
                            return (
                                <View key={index}>
                                    <View style={styles.borderBtn}></View>
                                    <View style={styles.card}>
                                        <MaterialIcons
                                            name="delete"
                                            color="#FFF"
                                            size={25}
                                            style={styles.trash}
                                            onPress={() => handleTrash(index)}
                                        />
                                        <Text style={styles.lblField}>
                                            Código do produto:
                                        </Text>
                                        <TextInput
                                            style={styles.txtInput}
                                            value={codigo}
                                            keyboardType="numeric"
                                            placeholder="0"
                                            onChangeText={(e) => {
                                                setProdutos((oldProdutos) => {
                                                    oldProdutos[index].codigo =
                                                        e;
                                                    return [...oldProdutos];
                                                });
                                            }}
                                        />
                                        <Text style={styles.lblField}>
                                            Produto:
                                        </Text>
                                        <TextInput
                                            style={styles.txtInput}
                                            value={produto}
                                            autoCapitalize="characters"
                                            placeholder="DESCRIÇÃO DO PRODUTO"
                                            onChangeText={(e) => {
                                                setProdutos((oldProdutos) => {
                                                    oldProdutos[index].produto =
                                                        e;
                                                    return [...oldProdutos];
                                                });
                                            }}
                                        />
                                        <Text style={styles.lblField}>
                                            Preço (R$):
                                        </Text>
                                        <TextInput
                                            style={styles.txtInput}
                                            value={preco}
                                            keyboardType="number-pad"
                                            onChangeText={(e) =>
                                                handleFormatPrice(e, index)
                                            }
                                        />
                                    </View>
                                </View>
                            );
                        })}
                    <Pressable
                        onPress={handleCadastrar}
                        style={styles.btnCadastrarFunc}
                    >
                        {({ pressed }) => (
                            <Text style={styles.btnCadastrar}>
                                {pressed ? "CADASTRANDO" : "CADASTRAR"}
                            </Text>
                        )}
                    </Pressable>
                </ScrollView>
            ) : (
                <>
                    <Text style={styles.lblField}>Descrição:</Text>
                    <TextInput
                        style={styles.txtInput}
                        value={descricao}
                        onChangeText={setDescricao}
                        autoCapitalize="characters"
                    />
                    <Pressable
                        onPress={handleCadastrarCategory}
                        style={styles.btnCadastrarFunc}
                    >
                        {({ pressed }) => (
                            <Text style={styles.btnCadastrar}>
                                {pressed ? "CADASTRANDO" : "CADASTRAR"}
                            </Text>
                        )}
                    </Pressable>
                    {categorias.length > 0 &&
                        categorias.map(({ id, descricao }) => {
                            return (
                                <View key={id}>
                                    <View style={[styles.card, { marginVertical: 10 }]}>
                                        <MaterialIcons
                                            name="delete"
                                            color="#FFF"
                                            size={25}
                                            style={styles.trash}
                                            onPress={() => handleRemoveCategory(id)}
                                        />
                                        <Text style={styles.listField}>
                                            {`Categoria: ${descricao}`}
                                        </Text>
                                    </View>
                                </View>
                            );
                        })}
                </>
            )}
        </View>
    );
};

export default FormNew;
