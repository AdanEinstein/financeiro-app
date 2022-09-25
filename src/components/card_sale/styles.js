import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        backgroundColor: '#FFF',
        padding: 10,
        margin: 15,
        borderRadius: 10,
        borderColor: '#E0D10E',
        borderWidth: 5
    },
    cliente: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#000'
    },
    clientePago: {
        fontSize: 25,
        fontWeight: 'bold',
        textDecorationLine: 'line-through',
        color: '#000' 
    },  
    preco: {
        fontSize: 20,
        fontWeight: '600',
        color: '#8DAB09'
    },
    dataParaPagar:{
        position: 'absolute',
        fontWeight: 'bold',
        fontSize: 15,
        top: 5,
        right: 10
    },
    categoria: {
        fontSize: 15,
    },
    botoes:{
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
        bottom: 5
    }, 
    btnPagar: {
        textAlign: 'center',
        marginHorizontal: 5,
        backgroundColor: '#88E30B33',
        borderColor: '#88E30B',
        padding: 5,
        borderWidth: 3,
        borderRadius: 10,
    },
    btnDespagar: {
        textAlign: 'center',
        marginHorizontal: 5,
        backgroundColor: '#FFA22633',
        borderColor: '#FFA226',
        padding: 5,
        borderWidth: 3,
        borderRadius: 10,
    },
    btnDelete: {
        textAlign: 'center',
        marginHorizontal: 5,
        backgroundColor: '#FB0D3433',
        borderColor: '#FB0D34',
        padding: 5,
        borderWidth: 3,
        borderRadius: 10,
    },
    containerPago:{
        position: 'relative',
        backgroundColor: '#FFF',
        padding: 10,
        margin: 15,
        borderRadius: 10,
        borderLeftWidth: 25,
        borderLeftColor: '#88E30B',
        borderRightColor: '#E0D10E',
        borderTopColor: '#E0D10E',
        borderBottomColor: '#E0D10E',
        borderWidth: 5 
    },
    pago: {
        fontSize: 15,
        fontWeight: 'bold',
    }
})

export default styles