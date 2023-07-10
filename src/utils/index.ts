export function findByMatchingProperties(set: any[], obj: object) {
    return set.filter(function (entry) {
        return Object.keys(obj).every(function (key) {
            return entry[key] === obj[key];
        });
    });
}

export function isNegative(number: number) {
    return Math.sign(number) === -1;
}

export function customFilter(text: string, sale: Data): boolean {
    if (text.startsWith("#")) {
        text = text.replace("#", "");
        const newProdutos = sale.produtos.filter((p) =>
            p.codigo?.toLowerCase().includes(text.toLowerCase())
        );
        return !!newProdutos.length
    } else if (text.startsWith("*")) {
        text = text.replace("*", "");
        const newProdutos = sale.produtos.filter((p) =>
            p.produto?.toLowerCase().includes(text.toLowerCase())
        );
        return !!newProdutos.length
    } else if (text.startsWith("@")) {
        text = text.replace("@", "");
        return sale?.categoria?.descricao?.toLowerCase().includes(text.toLowerCase());
    } else {
        return sale?.cliente?.toLowerCase().includes(text.toLowerCase());
    }
}