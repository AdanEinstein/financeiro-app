import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import stylesHome from "../styles/Home.styles.js";
import styles from "../styles/Sales.styles.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CardSale from "../components/card_sale/index.jsx";

export default function Sales({ route, navigation }) {
	//props.route.params
	const [sales, setSales] = useState([]);
	const [update, setUpdate] = useState(false);

	useEffect(() => {
		async function getSales() {
			try {
				const slsString = await AsyncStorage.getItem("@sales:venda");
				const sls = JSON.parse(slsString);
				if (sls !== null) setSales(sls);
				else setSales([]);
			} catch {}
		}
		getSales();
		setUpdate(false);
	}, [route, update]);

	return (
		<View style={styles.container}>
			{sales.length !== 0 ? (
				<View>
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
					<Text style={stylesHome.title}>Nenhuma venda 😩</Text>
					<Text style={stylesHome.subtitle}>
						Mas não se preocupe.
					</Text>
					<Text style={stylesHome.subtitle}>
						Você consegue, eu acredito em você 🙏
					</Text>
					<Text style={stylesHome.subtitle}>Boa sorte!</Text>
				</View>
			)}
		</View>
	);
}
