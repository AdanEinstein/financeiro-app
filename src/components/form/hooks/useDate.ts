import { useState } from "react"

export default function useDate(){
    const [date, setDate] = useState({dtVenda: false, dtPagar: false})

    const openDateVenda = () => setDate(prev => {
        return {...prev, dtVenda: true}
    })

    const closeDateVenda = () => setDate(prev => {
        return {...prev, dtVenda: false}
    })

    const openDatePagar = () => setDate(prev => {
        return {...prev, dtPagar: true}
    })

    const closeDatePagar = () => setDate(prev => {
        return {...prev, dtPagar: false}
    })
    
    return {
        openDatePagar, openDateVenda,
        closeDatePagar, closeDateVenda,
        dtVenda: date.dtVenda,
        dtPagar: date.dtPagar,
    }
}