interface Data {
    id?: number
    cliente: string
    categoria: Category
    contato: string
    dataDaVenda: Date
    dataParaPagar: Date
    produtos: Product[]
    pago: boolean
}

interface Category {
    id?: number
    descricao: string
}

interface Product {
    codigo: string
    produto: string
    preco: string
}