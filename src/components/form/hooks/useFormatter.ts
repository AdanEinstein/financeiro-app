
export default function useFormatter(){
    const handleFormatNumero = (tel: string) => {
            tel = tel.replace(/\D/g, "");
            tel = tel.replace(/(.\d)/, "($1");
            tel = tel.replace(/(.{3})(\d)/, "$1)$2");
            if (tel.length == 9) {
                tel = tel.replace(/(.{1})$/, "-$1");
            } else if (tel.length == 10) {
                tel = tel.replace(/(.{2})$/, "-$1");
            } else if (tel.length == 11) {
                tel = tel.replace(/(.{3})$/, "-$1");
            } else if (tel.length == 12) {
                tel = tel.replace(/(.{4})$/, "-$1");
            } else if (tel.length == 13) {
                tel = tel.replace(/(.{4})$/, "-$1");
            } else if (tel.length > 13) {
                return;
            }
            return tel
        }

    const handleFormatPrice = (price: string) => {
        price = price.replace(/\D/g, "");
        price = `${(parseInt(price) / 100).toFixed(2)}`;
        if (price.length < 18) {
            price = price
                .replace(".", ",")
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            return isNaN(parseInt(price) / 100) ? "0,00" : price;
        }
        return price
    };
    
    return { handleFormatNumero, handleFormatPrice}
}