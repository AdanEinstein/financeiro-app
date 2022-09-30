import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
        alignItems: "center",
        justifyContent: "center",
    },
    titleView: {
        padding: 15,
        backgroundColor: "#ccc2",
        borderRadius: 8,
        borderWidth: 3,
        borderColor: "#ccc",
        marginTop: 10,
    },
    title: {
        color: "#fff",
        fontSize: 30,
    },
    subtitle: {
        color: "#fff",
        fontSize: 20,
        marginTop: 10,
        letterSpacing: 0.5,
    },
    content: {},
});

export default styles;
