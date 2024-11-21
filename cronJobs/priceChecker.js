const axios = require('axios');
const Alert = require('../models/Alert');
const sendEmail = require('../utils/emailService');

const checkPrices = async () => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,cardano&vs_currencies=usd');
    const alerts = await Alert.find();

    alerts.forEach(async (alert) => {
      const price = data[alert.crypto]?.usd;
      if (
        (alert.condition === 'above' && price > alert.threshold) ||
        (alert.condition === 'below' && price < alert.threshold)
      ) {
        await sendEmail(alert.userEmail, 'Crypto Price Alert', `${alert.crypto} is now ${price} USD!`);

        // await alert.deleteOne(); // Remove alert after sending
        console.log(alert)
        const {_id} = alert
        await Alert.deleteOne({ _id }); 
      }
    });
  } catch (error) {
    console.error('Error checking prices:', error);
  }
};

module.exports = () => {
  setInterval(checkPrices, 60000); // Run every minute
};
