// const config = require('../../../config')

// const dataAds = require("./ads");
const dataConfirmEmail = require("./confirm-email");
const dataRecoverPassword = require("./recover-password");

const dataEndedPremium = require("./ended-premium");
// const dataExpertFeature = require("./expert-feature");
const dataInviteFriends = require("./invite-friends");
const dataNewAccount = require("./new-account");
// const dataNotification = require("./notification");
// const dataNotification2 = require("./notification2");
const dataOrderConfirm = require("./order-confirm");
// const dataProductUpdate = require("./product-update");
const dataRequiredEmail = require("./required-email");
// const dataSecondEndedPremium = require("./second-ended-premium");
const dataStartPremium = require("./start-premium");
// const dataTaskDelivery = require("./task-delivery");
// const dataTeamCommunity = require("./team-community");




const getData = (input) => {
  const words = input
    .split("-")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    );

  // Concatena las palabras para formar camelCase
  const camelCaseString = words.join("");

  // Agrega "data" al principio
  const camelCaseResult =
    "data" + camelCaseString.charAt(0).toUpperCase() + camelCaseString.slice(1);

  // Verificar si la variable existe
  if (typeof eval(camelCaseResult) !== "undefined") {
    // La variable existe, puedes usarla
    return eval(camelCaseResult);
  } else {
    // La variable no existe
    return dataConfirmEmail; // Devolver dataConfirmEmail en caso de error
  }
};

module.exports = { getData };
