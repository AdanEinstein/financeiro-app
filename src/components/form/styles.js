import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#ddd2",
		padding: 15,
	},
	lblField: {
		backgroundColor: "#fff",
		fontSize: 22,
		paddingTop: 5,
		paddingLeft: 10,
		borderTopLeftRadius: 5,
		borderTopRightRadius: 5,
	},
	txtInput: {
		backgroundColor: "#fff",
		marginBottom: 10,
		paddingBottom: 10,
		paddingLeft: 10,
		lineHeight: 15,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		fontSize: 22,
	},
	borderBtn: {
		borderColor: "#E0D10E",
		marginVertical: 20,
		borderWidth: 4,
		borderRadius: 5,
	},
	dateInput: {
		backgroundColor: "#fff",
		fontWeight: "bold",
		lineHeight: 25,
		paddingLeft: 15,
		paddingBottom: 10,
		borderBottomLeftRadius: 5,
		borderBottomRightRadius: 5,
		fontSize: 22,
	},
	viewCal: {
		position: "relative",
		justifyContent: "center",
		marginBottom: 10,
	},
	btnCalen: {
		position: "absolute",
		right: 15,
		borderRadius: 15,
		padding: 10,
		backgroundColor: "#555",
	},
	btnCadastrarFunc: ({ pressed }) => [
		{
			backgroundColor: pressed ? "#ddd" : "#E0D10E",
			paddingVertical: 15,
			marginVertical: 20,
			borderRadius: 10,
		},
	],
    btnCadastrar:{
        fontSize: 25,
        fontWeight: 'bold',
        color: '#444',
        textAlign: 'center',
    },
	btnAdicionar: {
		fontSize: 25,
		color: "#FFF",
		fontWeight: '600',
	},
	separador: {
		marginVertical: 15,
		alignItems: 'center',
		backgroundColor: '#312BFA',
		paddingVertical: 10,
		borderRadius: 10,
	},
	card: {
		backgroundColor: '#ccc5',
		padding: 10,
		borderRadius: 10
	},
	trash: {
		position: 'absolute',
		top: -10,
		right: 5,
		padding: 10,
		backgroundColor: '#FA2508',
		zIndex: 10,
		borderRadius: 10,
	},
	topo:{
		flexDirection: 'row',
	},
	selectTipo:{
		flex: 3
	},	
	clear:{
		flex: 1,
		backgroundColor: '#FA250833',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 5,
		marginLeft: 10,
		borderRadius: 10,
		borderColor: '#FA2508',
		borderWidth: 2,
	},
	txtClear:{
		color: "#FA2508",
		fontSize: 18,
		fontWeight: '800',
	},
	lblFieldTipo: {
		backgroundColor: '#FFF',
		paddingLeft: 10,
		paddingTop: 10,
		fontSize: 15,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	txtInputTipo: {
		backgroundColor: '#FFF',
	},
});

export default styles;
