const Ingresos = (texto) => {
    const listahora = []
    const total = []
    const fecha = []
    const receptor = []
    const emisor = []

    let cuentatotal=0
    let cuentafecha = 0
    let cuentaemisor = 0
    let cuentareceptor = 0
    let cuentaefecto = 0

    const String3 = "Total:"
    const StringEmisor = "RFC Emisor:"
    const StringReceptor = "RFC Receptor:"
    const StringFecha = "Fecha Emisión:"
    const StringEfecto = "Efecto del Comprobante:"


    for(let i=0; i<texto.length; i++){
        let line = texto[i];

        if(cuentaefecto == 1){
            listahora.push(line);
            cuentaefecto = 0
        };

        if(cuentatotal == 1){
            total.push(line)
            cuentatotal = 0
        };

        if(cuentafecha == 1){ 
            fecha.push(line)
            cuentafecha = 0
        };

        if(cuentareceptor == 1){
            receptor.push(line)
            cuentareceptor = 0
        };

        if(cuentaemisor == 1){
            emisor.push(line)
            cuentaemisor = 0
        };

        if(String3 === line) cuentatotal = 1
        if(StringFecha === line) cuentafecha = 1
        if(StringEmisor === line) cuentaemisor = 1
        if(StringReceptor === line) cuentareceptor = 1
        if(StringEfecto === line) cuentaefecto = 1

    };


    return (
        listahora.map((efecto, i) => {
            if(efecto === "Ingreso"){
                return {
                    tipo: "Ingreso",
                    fecha: fecha[i],
                    emisor: emisor[i],
                    receptor: receptor[i],
                    total: total[i]
                }
            }else{
                return {}
            }
        }).filter((objeto) => Object.keys(objeto).length > 0)
    )

}

module.exports = {Ingresos}