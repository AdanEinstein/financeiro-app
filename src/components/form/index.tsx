import {
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import styles from "./styles";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";
import useCategory from "./hooks/useCategory";
import useFormatter from "./hooks/useFormatter";
import useProducts from "./hooks/useProducts";
import useData from "./hooks/useData";
import useDate from "./hooks/useDate";

const FormNew = () => {
    const [tipo, setTipo] = useState("sale");
    const { descricao, setDescricao, categorias, handleCadastrarCategory, handleRemoveCategory } = useCategory()
    const { handleFormatPrice, handleFormatNumero } = useFormatter()
    const { produtos, setProdutos, handleAdd, handleTrash, handleClear: handleClearProducts } = useProducts()
    const { data, setData, handleCadastrar, handleClear } = useData(produtos)
    const date = useDate()

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
                <Pressable onPress={() => {
                        handleClear()
                        handleClearProducts()
                    }}>
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
                        value={data?.cliente || ""}
                        onChangeText={txt => setData(prev => {
                            return { ...prev, cliente: txt }
                        })}
                        autoCapitalize="characters"
                    />
                    <Text style={styles.lblField}>Categoria:</Text>
                    <Picker
                        style={styles.txtInput}
                        prompt="Categoria"
                        selectedValue={data?.categoria?.descricao || ""}
                        onValueChange={txt => setData(prev => {
                            return {
                                ...prev, categoria: {
                                    descricao: txt
                                }
                            }
                        })}
                    >
                        <Picker.Item label="Selecione a categoria" />
                        {!!categorias?.length ? (
                            categorias.map((cat) => {
                                return (
                                    <Picker.Item
                                        key={cat.id}
                                        label={cat.descricao}
                                        value={cat.descricao}
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
                        value={data?.contato || ""}
                        onChangeText={txt => setData(prev => {
                            return { ...prev, contato: handleFormatNumero(txt) }
                        })}
                        autoCapitalize="characters"
                        keyboardType="phone-pad"
                        placeholder="(11)95555-5555"
                    />
                    <View style={styles.viewCal}>
                        <Text style={styles.lblField}>Data da venda:</Text>
                        <Text style={styles.dateInput}>
                            {moment(data?.dataDaVenda || new Date()).format("DD/MM/YYYY")}
                        </Text>
                        <MaterialIcons
                            style={styles.btnCalen}
                            name="calendar-today"
                            color="#E0D10E"
                            size={25}
                            onPress={date.openDateVenda}
                        />
                    </View>
                    {date.dtVenda && <DateTimePicker
                        testID="dateTimePicker"
                        value={data?.dataDaVenda || new Date()}
                        mode="date"
                        onChange={(e, newDate) => {
                            date.closeDateVenda()
                            setData(prev => {
                                return { ...prev, dataDaVenda: newDate }
                            })
                        }}
                    />}
                    <View style={styles.viewCal}>
                        <Text style={styles.lblField}>Data para pagar:</Text>
                        <Text style={styles.dateInput}>
                            {moment(data?.dataParaPagar || new Date()).format("DD/MM/YYYY")}
                        </Text>
                        <MaterialIcons
                            style={styles.btnCalen}
                            name="calendar-today"
                            color="#E0D10E"
                            size={25}
                            onPress={date.openDatePagar}
                        />
                    </View>
                    {date.dtPagar && <DateTimePicker
                        testID="dateTimePicker"
                        value={new Date()}
                        mode="date"
                        onChange={(e, newDate) => {
                            date.closeDatePagar()
                            setData(prev => {
                                return { ...prev, dataParaPagar: newDate }
                            })
                        }}
                    />}
                    <Pressable style={styles.separador} onPress={handleAdd}>
                        <Text style={styles.btnAdicionar}>
                            Adicionar produto
                            <MaterialIcons name="add" color="#FFF" size={25} />
                        </Text>
                    </Pressable>
                    {!!produtos?.length && produtos.map(({ codigo, produto, preco }, index) => {
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
                                                oldProdutos[index].codigo = e;
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
                                                oldProdutos[index].produto = e;
                                                return [...oldProdutos];
                                            });
                                        }}
                                    />
                                    <Text style={styles.lblField}>
                                        Preço (R$):
                                    </Text>
                                    <TextInput
                                        style={styles.txtInput}
                                        value={`${preco}`}
                                        keyboardType="number-pad"
                                        onChangeText={(e) => {
                                            setProdutos((oldProdutos) => {
                                                oldProdutos[index].preco = handleFormatPrice(e);
                                                return [...oldProdutos];
                                            });
                                        }}
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
                    {!!categorias?.length && categorias.map(({ id, descricao }) => {
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
