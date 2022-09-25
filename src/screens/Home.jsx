import { Text, View } from "react-native";
import styles from "../styles/Home.styles"

export default function Home(){
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Bem vindo ao Sales 😁</Text>
                <Text style={styles.subtitle}>
                    Aqui você pode controlar suas
                </Text>
                <Text style={styles.subtitle}>vendas sem dificuldade.</Text>
                <Text style={styles.subtitle}>Aproveite!</Text>
            </View>
        </View>
    );
}