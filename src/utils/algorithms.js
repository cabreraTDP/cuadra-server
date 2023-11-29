const moment = require("moment")
const { monthToNumber } = require("./extras")


const SAT = (texto) => {
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

const Ingresos = (texto) => {
    operaciones = SAT(texto)
    return operaciones.map(operacion => ({...operacion, tipo: "Ingreso"}))
}

const Egresos = (texto) => {
    operaciones = SAT(texto)
    return operaciones.map(operacion => ({...operacion, tipo: "Gasto"}))
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
            listaISR.push(Number(line.replace('$', '').replace(',', '')))
            contadorISR = 0
        };
        if (contadorTotal == 1) {
            listaTotal.push(Number(line.replace('$', '').replace(',', '')))
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
        if (listaIVA[i] > 0) {
            if (listaISR[i] > 0) {
                finales.push(
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`, 'MM-YYYY').format(),
                        total: listaIVA[i],
                        descripcion: 'IVA'
                    },
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`, 'MM-YYYY').format(),
                        total: listaISR[i],
                        descripcion: 'ISR'
                    }
                )
            } else {
                finales.push(
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`, 'MM-YYYY').format(),
                        total: listaIVA[i],
                        descripcion: 'IVA'
                    }
                )
            }
        } else {
            if (listaISR[i] > 0) {
                finales.push(
                    {
                        tipo: "Gasto",
                        fecha: moment(`${monthToNumber[listaMes[i]]}-${listaYear[i]}`, 'MM-YYYY').format(),
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


const IMSS = (texto) => {
    let nuevo = ""
    
    texto.forEach(line => {
        nuevo = nuevo+line
    });

    let fecha = []
 

    let IMSS1 = new RegExp("SISTEMA ÚNICO DE AUTODETERMINACIÓNV");
    const totalIMSS1text = new RegExp("Total a pagar: ");
    const totalIMSS11text = /Total a pagar:\d*\D+\d*\D+\d*/i;

    const IMSS2 = new RegExp("Propuesta de Cédula de Determinación de Cuotas IMSS");
    const totalIMSS2text = /IMPORTE TOTAL:.*?\.\d\d/;

    const IMSS3 = new RegExp("Propuesta de Cédula de Determinación de Cuotas, Aportaciones y Amortizaciones");
    const totalIMSS3text = /Importe Total:.*?\.\d\d/

    const IMSS4 = new RegExp("SISTEMA ÚNICO DE AUTODETERMINACIÓNCÉDULA DE DETERMINACIÓN DE CUOTASOBRERO-PATRONALES, APORTACIONES Y AMORTIZACIONES");
    const totalIMSS4text = /Amortización:.*?T/g;

    FechaIMSS1 = /Proceso: \w*-\d{4}/;
    FechaIMSS12 = /Proceso:\w/i;

    FechaIMSS2 = /PERIODO.{9}/

    FechaIMSS3 = /BIMESTRE.{9}/

    FechaIMSS4 = /Proceso:\w*-\d{4}/;


    contador = 0
   

        const line = nuevo;
        const ResIMSS1 = line.match(IMSS1);
        const ResIMSS11 = line.match(totalIMSS11text);
        const ResIMSS2 = line.match(IMSS2);
        const ResIMSS3 = line.match(IMSS3);
        const ResIMSS4 = line.match(IMSS4);

        if (contador == 0) {
            if (ResIMSS1 != null) {
                archivo = "IMSS1"
                nombrearchivo = "SUA - IMSS"
            };
            if (ResIMSS2 != null) {
                archivo = "IMSS2"
                nombrearchivo = "IMSS"
            };
            if (ResIMSS3 != null) {
                archivo = "IMSS3"
                nombrearchivo = "INFONAVIT"
            };
            if (ResIMSS4 != null) {
                archivo = "IMSS4"
                nombrearchivo = "SUA - INFONAVIT"
            };

        };
        if (archivo == "IMSS1") {
            const ResTotalIMSS1 = line.match(totalIMSS11text);
            if (ResTotalIMSS1 != null) {
                fecha = line.match(FechaIMSS1);
                if(fecha != null){
                    fecha = fecha[0].replace("Proceso: ","").split("-");
                    const tempFecha = `${monthToNumber[fecha[0]]}/${fecha[1]}`
                    fecha = moment(tempFecha,'MM/YYYYY').format()
                }else{
                    fecha= 'none'
                }
                total = ResTotalIMSS1;
                saldototal = total[0].replace("Total a pagar:","");
                totalIMSS1 = saldototal
                dato = Number(totalIMSS1.replace(",",""));
            }
            
        } else if (archivo == "IMSS2") {
            const ResTotalIMSS2 = line.match(totalIMSS2text);
            dato = Number(ResTotalIMSS2[0].replace("IMPORTE TOTAL:","").replace(",",""));
            const fechalinea = line.match(FechaIMSS2);

            const tempFecha = fechalinea[0].replace("PERIODO","").replace(" - ",",").split(",")
            const fechaConcat = `${tempFecha[0]}/${tempFecha[1]}`
            fecha = moment(fechaConcat,'MM/YYYYY').format()

        } else if (archivo == "IMSS3") {
            const ResTotalIMSS3 = line.match(totalIMSS3text);
            fechalinea = line.match(FechaIMSS3);

            dato = Number(ResTotalIMSS3[0].replace("Importe Total:","").replace(",",""));

            const tempFecha = fechalinea[0].replace("BIMESTRE","").replace(" - ",",").split(",");
            const fechaConcat = `${tempFecha[0]}/${tempFecha[1]}`
            fecha = moment(fechaConcat,'MM/YYYYY').format()


        } else if (archivo == "IMSS4") {
            let ResTotalIMSS4 = line.match(totalIMSS4text);
            if (ResTotalIMSS4 != null) {
                ResTotalIMSS4 = ResTotalIMSS4[0].replace("T","")
                
                fecha = line.match(FechaIMSS4);
                if (fecha != null) {
                    fecha = fecha[0].replace("Proceso:","").split("-")
                    const tempFecha = `${monthToNumber[fecha[0]]}/${fecha[1]}`
                    fecha = moment(tempFecha,'MM/YYYYY').format()
                } else {
                    //fecha = toString(nombre);
                }
                const total2 = ResTotalIMSS4;
                const saldototal2 = total2.match(/\d.*/);
                totalIMSS4 = saldototal2[0]
                dato = Number(totalIMSS4.replace(",",""));;
                
            }

        };


    return([{
        nombrearchivo,
        dato,
        fecha
    }])
}

module.exports = { Ingresos, Egresos, Impuestos, IMSS }
