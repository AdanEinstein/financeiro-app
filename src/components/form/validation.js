import * as yup from "yup";

yup.setLocale({
	mixed: {
		required(params) {
			return `${params.path} não foi preenchido`;
		},
	},
	array: {
		min: "Necessário pelo menos um produto",
	},
	string: {
		matches(params) {
			return `${params.path} incorreto!`;
		},
	},
});

const schemaCliente = yup.object().shape({
	id: yup.string().required(),
	produtos: yup
		.array()
		.of(
			yup.object().shape({
				preco: yup.string().required().label("Preço"),
				produto: yup.string().required().label("Descrição do produto"),
				codigo: yup.string(),
			})
		)
		.min(1)
		.required()
		.label("Lista de produtos"),
	dataParaPagar: yup.string().required().label("Data para pagar"),
	dataDaVenda: yup.string().required().label("Data da venda"),
	numero: yup.string().required().label("Número de telefone"),
	categoria: yup.string().required().label("Categoria"),
	cliente: yup.string().required().label("Cliente"),
	pago: yup.bool()
});

const schemaCategoria = yup.object().shape({
	id: yup.string().required(),
	descricao: yup.string().required().label("Descrição"),
});

export { schemaCliente, schemaCategoria };
