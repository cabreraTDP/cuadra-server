const moment = require("moment")
const { monthToNumber } = require("./extras")


const Ingresos = (texto) => {
    const listahora = []
    const total = []
    const fecha = []
    const receptor = []
    const emisor = []

    let cuentatotal = 0
    let cuentafecha = 0
    let cuentaemisor = 0
    let cuentareceptor = 0
    let cuentaefecto = 0

    const String3 = "Total:"
    const StringEmisor = "RFC Emisor:"
    const StringReceptor = "RFC Receptor:"
    const StringFecha = "Fecha Emisión:"
    const StringEfecto = "Efecto del Comprobante:"


    for (let i = 0; i < texto.length; i++) {
        let line = texto[i];

        if (cuentaefecto == 1) {
            listahora.push(line);
            cuentaefecto = 0
        };

        if (cuentatotal == 1) {
            total.push(line)
            cuentatotal = 0
        };

        if (cuentafecha == 1) {
            fecha.push(line)
            cuentafecha = 0
        };

        if (cuentareceptor == 1) {
            receptor.push(line)
            cuentareceptor = 0
        };

        if (cuentaemisor == 1) {
            emisor.push(line)
            cuentaemisor = 0
        };

        if (String3 === line) cuentatotal = 1
        if (StringFecha === line) cuentafecha = 1
        if (StringEmisor === line) cuentaemisor = 1
        if (StringReceptor === line) cuentareceptor = 1
        if (StringEfecto === line) cuentaefecto = 1

    };


    return (
        listahora.map((efecto, i) => {
            if (efecto === "Ingreso") {
                return {
                    tipo: "Ingreso",
                    fecha: fecha[i],
                    emisor: emisor[i],
                    receptor: receptor[i],
                    total: total[i]
                }
            } else {
                return {}
            }
        }).filter((objeto) => Object.keys(objeto).length > 0)
    )

}
const Impuestos = (texto) => {
    listaRFC = []
    listaMes = []
    listaYear = []
    listaArchivo = []
    listaIVA = []
    listaISR = []
    listaTotal = []
    listaTipos = []

    contadorRFC = 0
    contadorMes = 0
    contadorYear = 0
    contadorArchivo = 0
    contadorIVA = 0
    contadorISR = 0
    contadorTotal = 0

    StringRFC = "RFC:"
    StringMes = "Período de la declaración:"
    StringYear = "Ejercicio:"
    //En el archivo original de Py
    //El contenido de StringTotal es: "^a pagar:"
    StringTotal = "a pagar:"
    StringISR = "Impuesto a cargo:"
    StringComplementaria = "Complementaria"

    Archivo = "Impuestos"
    for (let i = 0; i < texto.length; i++) {
        let line = texto[i];

        if (StringComplementaria != null) {
            Archivo = "Salarios"
        };
        if (contadorRFC == 1) {
            listaRFC.push(line)
            contadorRFC = 0
        };
        if (contadorMes == 1) {
            listaMes.push(line)
            contadorMes = 0
        };
        if (contadorYear == 1) {
            listaYear.push(line)
            contadorYear = 0
        };
        //No estoy muy seguro si el If contadorArchivo debe de ir
        if (contadorArchivo == 1) {
            listaArchivo.push(line)
            contadorArchivo = 0
        };
        if (contadorISR == 1) {
            listaISR.push(Number(line.replace('$','').replace(',','')))
            contadorISR = 0
        };
        if (contadorTotal == 1) {
            listaTotal.push(Number(line.replace('$','').replace(',','')))
            contadorTotal = 0
        };

        if (StringRFC === line) contadorRFC = 1
        if (StringYear === line) contadorYear = 1
        if (StringMes === line) contadorMes = 1
        if (StringComplementaria === line) contadorArchivo = 1
        if (StringISR === line) contadorISR = 1
        if (StringTotal === line) contadorTotal = 1

        listaTipos.push(Archivo)
    };

    for (let i = 0; i < listaArchivo.length; i++) {
        tipoArchivo = listaTipos[i]
        if (tipoArchivo == "Impuestos") {
            listaIVA.push(listaTotal[i] - listaISR[i])
        }
        else {
            listaIVA.push(0)
            listaISR[i] = listaTotal[i]
        }
    }

    let finales = [];

    listaTotal.map((efecto, i) => {
        if(listaIVA[i] > 0){
            if(listaISR[i] > 0){
                finales.push(
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`,'MM-YYYY').format(),
                        total: listaIVA[i],
                        descripcion: 'IVA'
                    },
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`,'MM-YYYY').format(),
                        total: listaISR[i],
                        descripcion: 'ISR'
                    }
                )
            }else{
                finales.push(
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`,'MM-YYYY').format(),
                        total: listaIVA[i],
                        descripcion: 'IVA'
                    }
                )
            }
        }else{
            if(listaISR[i] > 0){
                finales.push(
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`,'MM-YYYY').format(),
                        total: listaISR[i],
                        descripcion: 'ISR'
                    }
                )
            }
        }
    })
    finales = finales.filter((objeto) => Object.keys(objeto).length > 0)

    return finales
}




module.exports = { Ingresos, Impuestos }