
const fs = require('fs');
const pdf = require('html-pdf');
const os = require('os');
const ejs = require('ejs');
const BrazilianValues = require('brazilian-values');
const path = require('path');
var express = require('express');
var app = express();
const port = 3000


async function main (BrazilianValues, fs, pdf, os, path, res) {


    const ejsFilename = path.join(__dirname, './example.ejs')

    const data = {
      NrCpf: 02138767019
    };
    data.BrazilianValues = BrazilianValues;

    const htmlString = await ejs.renderFile(ejsFilename, data);
    const pdfOptions = { format: 'A4', orientation: 'portrait' };
  await RetornaPDF(htmlString, pdfOptions, res);
    return undefined;
  }



async function RetornaPDF (htmlString, pdfOptions, res) {
  //  Gera o arquivo PDF
  const pdfBuffer = await new Promise((resolve, reject) => {
    pdf.create(htmlString, pdfOptions).toBuffer((err, buffer) => {
      if (err)
        throw err;
      resolve(buffer);
    });
  });
  //  Retorna o PDF para a API
  res.type('pdf');
  res.send(pdfBuffer);
}

app.get('/', function (req, res) {
  main(BrazilianValues, fs, pdf, os, path, res);
})


app.listen(port, () => {

})
