import { useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import styles from "./styles";
import moment from "moment";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CardSale({ sale, navigation, setUpdate, update }) {
	const [total, setTotal] = useState(0.0);

	useEffect(() => {
		const totalCalculado = sale.produtos
			.map((p) => {
				return Number.parseFloat(
					p.preco.replace(".", "").replace(",", ".")
				);
			})
			.reduce((acc, atual) => (acc += atual), 0);
		setTotal(totalCalculado);
	}, [sale]);

	const handleSale = () => {
		navigation.navigate("Novo", { data: sale });
	};

	const handlePagar = async () => {
		const newSale = sale;
		newSale.pago = true;
		const sls = JSON.parse(await AsyncStorage.getItem("@sales:venda"));
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
		const sls = JSON.parse(await AsyncStorage.getItem("@sales:venda"));
		const newSls = sls.map((s) => {
			if (s.id == sale.id) return newSale;
			return s;
		});
		await AsyncStorage.setItem("@sales:venda", JSON.stringify(newSls));
		setUpdate(true);
	};

	const handleDeletar = async () => {
		const sls = JSON.parse(await AsyncStorage.getItem("@sales:venda"));
		const newSls = sls.filter((s) => s.id !== sale.id);
		await AsyncStorage.setItem("@sales:venda", JSON.stringify(newSls));
		setUpdate(true);
	};

	const handleJaPago = () => {
		Alert.alert("Lembrete", "Venda já estava paga :)");
	};

	return (
		<Pressable onPress={!sale.pago ? handleSale : handleJaPago}>
			<View style={sale.pago ? styles.containerPago : styles.container}>
				<View>
					<Text
						style={!sale.pago ? styles.cliente : styles.clientePago}
					>
						{sale.cliente}
					</Text>
					{sale.pago && (
						<Text style={styles.pago}>Pago</Text>
					)}
				</View>
				<Text style={styles.preco}>
					R$ {total.toFixed(2).replace(",", ".").replace(".", ",")}
				</Text>
				<Text style={styles.dataParaPagar}>
					{moment(sale.dataDaVenda).format("DD/MM/YYYY")} -{" "}
					{moment(sale.dataParaPagar).format("DD/MM/YYYY")}
				</Text>
				<Text style={styles.categoria}>{sale.categoria}</Text>
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
