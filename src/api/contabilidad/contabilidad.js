const PDFExtract = require('pdf.js-extract').PDFExtract;

const prueba = (req, res) => {
    console.log('Prueba');

    res.status(200).json({
        modulo: "nominas"
    })
};

const uploadPDF = async(req,res) => {
    //Get File
    const {file} = req.files;


    //Set options for pdfExtract
    const options = {
        normalizeWhitespace: true
    };

    const pdfExtract = new PDFExtract();

    //Data is an array of pages, each page has a document for its content
    const data = await pdfExtract.extractBuffer(file[0].buffer, options)

    //get an array with content from pages in string
    const contenido = data.pages.map((page) => page.content.map((content)=>content.str));

    //Texto is an array of strings with the pdf content
    let texto = []
    let textoString = "";
    contenido.forEach((page)=>
        page.forEach((line) => {
            if(line !== '' && line !== ' ') {
                texto.push(line);
                textoString += line + " ";
            }
        })
    )
    console.log(textoString)

    res.status(200).json({
        modulo: "PDF"
    })
}

module.exports = {
    prueba,
    uploadPDF
}