import { Pressable, Text, View } from "react-native";
import styles from "./styles";
import moment from "moment";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import useCardSale from "./hooks";

export default function CardSale({ sale, setUpdate }: { sale: Data, setUpdate: (...args: any) => void }) {
    const {handleSale, handlePagar, handleJaPago, handleDeletar, handleDespagar} = useCardSale({sale, setUpdate})
    const totalCalculado = sale.produtos
        .map(p => p.preco)
        .map(p => p.replace('.', ''))
        .map(p => p.replace(',', '.'))
        .map(p => parseFloat(p))
        .reduce((acc, atual) => (acc += atual), 0);

    return (
        <Pressable onPress={!sale.pago ? handleSale : handleJaPago}>
            <View style={sale.pago ? styles.containerPago : styles.container}>
                <View>
                    <Text
                        style={!sale.pago ? styles.cliente : styles.clientePago}
                    >
                        {sale.cliente}
                    </Text>
                    {sale.pago && <Text style={styles.pago}>Pago</Text>}
                </View>
                <Text style={styles.preco}>
                    {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(totalCalculado)}
                </Text>
                <Text style={styles.dataParaPagar}>
                    {moment(sale.dataDaVenda).format("DD/MM/YYYY")} -{" "}
                    {moment(sale.dataParaPagar).format("DD/MM/YYYY")}
                </Text>
                <Text style={styles.categoria}>{sale.categoria.descricao}</Text>
                <View style={styles.botoes}>
                    <Pressable
                        style={{ zIndex: 10 }}
                        onPress={!sale.pago ? handlePagar : handleDespagar}
                    >
                        {!sale.pago ? (
                            <AntDesign
                                name="like1"
                                size={35}
                                color="#88E30B"
                                style={styles.btnPagar}
                            />
                        ) : (
                            <AntDesign
                                name="dislike1"
                                size={35}
                                color="#FFA226"
                                style={styles.btnDespagar}
                            />
                        )}
                    </Pressable>
                    <Pressable style={{ zIndex: 10 }} onPress={handleDeletar}>
                        <MaterialIcons
                            name="delete-forever"
                            size={35}
                            color="#FB0D34"
                            style={styles.btnDelete}
                        />
                    </Pressable>
                </View>
            </View>
        </Pressable>
    );
}
