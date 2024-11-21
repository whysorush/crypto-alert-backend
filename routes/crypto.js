const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/prices', async (req, res) => {
  try {
    const { data } = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin,solana,cardano&vs_currencies=usd');
    res.json(data);
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    res.status(500).json({ error: 'Failed to fetch prices' });
  }
});

module.exports = router;
