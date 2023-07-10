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

const schemaCategory = yup.object().shape({
	id: yup.number(),
	descricao: yup.string().required().label("Categoria"),
});

const schemaProduct = yup.object().shape({
	preco: yup.string().required().label("Preço"),
	produto: yup.string().required().label("Descrição do produto"),
	codigo: yup.string(),
})

const schemaData = yup.object().shape({
	id: yup.number().required(),
	produtos: yup
		.array()
		.of(schemaProduct)
		.min(1)
		.required()
		.label("Lista de produtos"),
	dataParaPagar: yup.string().required().label("Data para pagar"),
	dataDaVenda: yup.string().required().label("Data da venda"),
	contato: yup.string().label("Número de telefone"),
	categoria: schemaCategory,
	cliente: yup.string().required().label("Cliente"),
	pago: yup.bool()
});


export { schemaData, schemaCategory };
