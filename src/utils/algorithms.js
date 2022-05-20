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


const IMSS = (texto) => {
    listaarch = []
    listaerrores1 = []
    listaerrores2 = []
    listafech = []
    listahora = []
    listauser = []
    listaip = []
    contenido = []
    inicio = []
    fin = []
    total = []
    const fecha = []
    receptor = []
    emisor = []

    count = 1
    contador = 0
    StringRFC = "RFC:"
    StringMes = "Período de la declaración:"
    StringYear = "Ejercicio:"
    String = "Efecto del Comprobante: .*"
    String2 = "Ingreso.*"
    String3 = "Total:"
    StringEmisor = "Emisor"
    StringReceptor = "Receptor"
    StringFecha = "Fecha Emisión:"
    StringNombres = "Nombre o Razón Social:.*"

    StringInicio = "Lic."
    StringFinal = "Efecto del Comprobante: .*"



    IMSS1 = "SISTEMA ÚNICO DE AUTODETERMINACIÓNV"
    totalIMSS1text = "Total a pagar: "
    const totalIMSS11text = "Total a pagar: \d*\D+\d*\D+\d*"

    IMSS2 = "PropuestadeCéduladeDeterminacióndeCuotasIMSS"
    totalIMSS2text = "IMPORTETOTAL:"

    IMSS3 = "PropuestadeCéduladeDeterminacióndeCuotas,AportacionesyAmortizaciones"
    totalIMSS3text = "ImporteTotal:"

    IMSS4 = "SISTEMA ÚNICO DE AUTODETERMINACIÓNCÉDULA DE DETERMINACIÓN DE CUOTAS OBRERO-PATRONALES, APORTACIONES Y AMORTIZACIONES"
    totalIMSS4text = "Amortización: \d*\D+\d*\D+\d*"

    totalIMSS1 = 0
    totalIMSS2 = 0
    totalIMSS3 = 0
    totalIMSS4 = 0

    RegistroPatronalText = "\w\d\d-\d\d\d\d\d-\d\d-\d"

    datos = []
    registros = []
    tipos = []
    fechas = []
    empresas = []
    registrosunicos = []
    nombres = []

    FechaIMSS1 = "Proceso: \w*-\d{4}"
    FechaIMSS12 = "Proceso: \w"

    FechaIMSS2 = "PERIODO"

    FechaIMSS3 = "BIMESTRE"

    FechaIMSS4 = "Proceso: \w*-\d{4}"

    nombrepdf = "^.*\."

    count = 1
    contador = 0
    archivos = 1
    texto = '.txt'
    contador = 0
    contarlineas = 0
    contarlineas2 = 0
    cuentaIMSS2 = 1
    cuentaIMSS3 = 1
    cuentaFecha = 0
    nuevodigito = 0
    const  archivo = "";
    const nombrearchivo="";
    const dato="";
    const a = toString(os.path.join(name));
    const fechalinea=0;
    const registroPatronal="";
    for (let line = 0; line < texto.length; i++) {
        const ResIMSS1 = re.search(IMSS1, line);
        const ResIMSS11 = re.search(totalIMSS11text, line);
        const ResIMSS2 = re.search(IMSS2, line);
        const ResIMSS3 = re.search(IMSS3, line);
        const ResIMSS4 = re.search(IMSS4, line);
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
            const ResTotalIMSS1 = re.search(totalIMSS11text, line);
            if (ResTotalIMSS1 != null) {
                fecha = re.search(" .*", fecha.groupBy(0));
                fecha = fecha.groupBy(0);
            } else {
                //pendiente de asignar variable nombre
                fecha = "Sin Asignar";
            };
            total = ResTotalIMSS1.group(0);
            saldototal = re.search('\d.*', total);
            totalIMSS1 = saldototal.groupBy(0);
            dato = totalIMSS1;
            registroPatronal = re.search(RegistroPatronalText, line);
            if (registroPatronal != null) {
                registroPatronal = registroPatronal.groupBy(0);
            }
            else {
                //--**Reajustar variable nombre
                registroPatronal = "Sin Asignar";
            }
        } else if (archivo == "IMSS2") {
            var ResTotalIMSS2 = re.search(totalIMSS2text, line);
            fechalinea = re.search(FechaIMSS2, line);

            if (fechalinea != null) {
                cuentaFecha = 1;
            }
            cuentaIMSS2 = cuentaIMSS2 + 1;
            if (cuentaIMSS2 == 7) {
                const empresa = re.search("\w*", line);
                empresas.push(empresa.groupBy(0));
            }
            if (cuentaIMSS2 == 8) {
                //Detalle variable a
                a = re.search("^.*\d", line)
                registroPatronal = a.groupBy(0);
                registrosunicos.push(registroPatronal);
            }
            if (ResTotalIMSS2 != null) {
                contarlineas = 1;
            }

        } else if (archivo == "IMSS3") {
            const ResTotalIMSS3 = re.search(totalIMSS3text, line);
            fechalinea = re.search(FechaIMSS3, line);

            if (fechalinea != null) {
                cuentaFecha = 1;
            };
            cuentaIMSS3 = cuentaIMSS3 + 1;
            if (cuentaIMSS3 == 8) {
                a = re.search("^.*\d", line);
                registroPatronal = a.groupBy(0);
            }

            if (ResTotalIMSS3 != null) {
                contarlineas2 = 1;
            }

        } else if (archivo == "IMSS4") {
            const ResTotalIMSS4 = re.search(totalIMSS4text, line);
            if (ResTotalIMSS4 != null) {
                fecha = re.search(FechaIMSS4, line);
                if (fecha != null) {
                    fecha = re.search(" .*", fecha.groupBy(0));
                    fecha = fecha.groupBy(0);
                } else {
                    fecha = toString(nombre);
                }
                const total2 = ResTotalIMSS4.groupBy(0);
                const saldototal2 = re.search("\d.*", total2);
                totalIMSS4 = saldototal2.groupBy(0)
                dato = totalIMSS4;
                registroPatronal = re.search(RegistroPatronalText, line);
                if (registroPatronal != null) {
                    registroPatronal = registroPatronal.groupBy(0);
                }
                else {
                    registroPatronal = toString(nombre);
                };
            }

        };
        if (contarlineas > 0) {
            contarlineas = contarlineas + 1;
        };
        if (contarlineas == 5) {
            totalIMSS2 = line;
            //Detalle en variable a
            a = re.search("\d*.*\d*\.\d+", line);
            dato = a.groupBy(0);
        };
        if (contarlineas2 > 0) {
            contarlineas2 = contarlineas2 + 1;
        }
        if (contarlineas2 == 3) {
            totalIMSS3 = line;
            a = re.search("\d*.*\d*\.\d+", line);
            dato = a.groupBy(0);
        }
        if (cuentaFecha > 0) {
            cuentaFecha = cuentaFecha + 1;
        }

        if (cuentaFecha == 3) {
            const b = re.search("\d\d-\d\d\d\d", line);
            fecha = b.groupBy(0);
        }
        contador = contador + 1;
    };
    if (archivo == "IMSS3") {
        const digito = re.search("..", fecha);
        digito = digito.groupBy(0);

        if (digito == '01') {
            nuevodigito = '02';
        }
        else if (digito == '02') {
            nuevodigito = '04';
        }
        else if (digito == '03') {
            nuevodigito = '06';
        }
        else if (digito == '04') {
            nuevodigito = '08';
        }
        else if (digito == '05') {
            nuevodigito = '10';
        }
        else if (digito == '06') {
            nuevodigito = '12';
        }
        const fecha1 = re.search("-.*", fecha);
        //print(fecha1.group(0))
        //print(nuevodigito)
        fecha = toString(nuevodigito) + (fecha1.groupBy(0));
    }
    if (re.search("\w", dato) == null) {
        dato = parseFloat(dato.replace(",", ""));
    };

    datos.push(dato);
    registros.push(registroPatronal);
    tipos.push(nombrearchivo);
    fechas.push(fecha);
    nombres.push(toString(os.path.join(name)));
    count += 1

}
function mes(fecha) {
    const texto = re.search("..", fecha);
    const fechaFinal="";
    if (texto == null) {
         fechaFinal = fecha;
    }
    else {
        texto = texto.groupBy(0);
        const mes = '';

        if (texto == '01') {
            mes = 'Enero'
        }
        else if (texto == '02') {
            mes = 'Febrero';
        }
        else if (texto == '03') {
            mes = 'Marzo';
        }
        else if (texto == '04') {
            mes = 'Abril';
        }
        else if (texto == '05') {
            mes = 'Mayo';
        }
        else if (texto == '06') {
            mes = 'Junio';
        }
        else if (texto == '07') {
            mes = 'Julio';
        }
        else if (texto == '08') {
            mes = 'Agosto';
        }
        else if (texto == '09') {
            mes = 'Septiembre';
        }
        else if (texto == '10') {
            mes = 'Octubre';
        }
        else if (texto == '11') {
            mes = 'Noviembre';
        }
        else if (texto == '12') {
            mes = 'diciembre';
        }
        const texto2 = re.search("-.*", fecha);
        texto2 = texto2.groupBy(0);
        const estexto = re.search("\D\D", texto);

        if (estexto == null) {
            fechaFinal = mes + texto2;
        }
        else {
            fechaFinal = re.search("\S.*", fecha);
            fechaFinal = fechaFinal.groupBy(0);
        }
    }

    return fechaFinal;
}

module.exports = { Ingresos, Impuestos, IMSS, mes }
