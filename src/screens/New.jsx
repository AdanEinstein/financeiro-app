import { View } from "react-native";
import FormNew from "../components/form";
import styles from "../styles/New.styles.js";

export default function New({navigation, route}) {
	return (
		<View style={styles.container}>
			<FormNew navigation={navigation} data={route.params?.data}/>
		</View>
	);
}
