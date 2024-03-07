//https://medium.com/nerd-for-tech/c%C3%B3mo-enviar-emails-en-node-js-sin-tanto-rollo-53b7b1738b8a

const fs = require("fs").promises;
const path = require("path");

const nodemailer = require('nodemailer')

const {
    generateUniqueToken,
    calculateExpirationDateForOneDay
} = require('../helpers/tokenGenerator')

const token = generateUniqueToken()
const expiration = calculateExpirationDateForOneDay()
//   const { invitationTemplate } = require('./invitationTemplate')

const {
    getData
} = require("../middlewares/emails/templates")
const {
    templateHtml
} = require("../middlewares/emails/templates/templateHtml.js")




const getTemplate = async (name) => {
  try {
    // Assuming the HTML file is in the same directory as your script
    const filePath = path.join(
      __dirname,
      "../middlewares/emails/templates/",
      name + ".html"
    );
  
    // Read the content of the HTML file asynchronously
    const html = await fs.readFile(filePath, "utf8");

    // Return the HTML content
    return {status: 200, html};
  } catch (error) {
    // console.error("An unexpected error occurred:", error);
    return {status: 404, error};
  }
};


const insertData = (htmlTemplate, data) => {
    try {
      // Utilizamos una expresión regular para encontrar todas las coincidencias de {variable}
      const variableRegex = /\{{([^}]+)\}}/g;
  
      // Utilizamos una función de reemplazo para reemplazar cada coincidencia con el valor correspondiente de 'data'
      const replacedTemplate = htmlTemplate.replace(variableRegex, (match, variable) => {
        // Verificamos si la variable existe en 'data'
        if (data.hasOwnProperty(variable)) {
          // Devolvemos el valor de la variable desde 'data'
          return data[variable];
        } else {
          // Si la variable no existe, devolvemos "not found {variable}"
          return `not found ${variable}`;
        }
      });
  
      return replacedTemplate;
    } catch (error) {
      // Handle the error accordingly (throw an error or return a status code)
      throw new Error('Error during variable replacement');
    }
  };


const setEmail = async (template, item) => {
  const resp = await getTemplate(template);
  if (resp.status == 404) {
    // console.log("Template not found");
    // response(res, 404, resp.error);
    return false;
  }

  let data = getData(template)
  console.log('item', item)
  // data.token = item.token
  data = { ...data, ...item };

  // data.footerHtml = templateHtml.footerHtml

  const html = insertData(resp.html, data);
  return html
};






async function sendEmail(email, template, data) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'info@aythen.com',
      pass: 'azyx mpfz fveg bqlr',
    },
  });

  const mailOptions = {
    from: `info@aythen.com`,
    to: email, // `info@aythen.com`,
    // to: `eng.carlos.valle@gmail.com`,
    subject: 'Invitacion a mi workspace',
    text: `Hola, te invito a formar parte de mi espacio de trabajo`,
    html: await setEmail(template, data)
  }

  // console.log('ee', mailOptions)
  try {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error al enviar el correo electrónico:', error);
      } else {
        console.log('Correo electrónico enviado exitosamente');
      }
    });
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', error);
  }
}









const getEmail = async (req, res) => {
  const { id } = req.params
  const html = await setEmail(id)
  // response(res, 404, html);
  return res.send(html)
}







module.exports = { 
    getEmail: getEmail,
    sendEmail: sendEmail
 };
