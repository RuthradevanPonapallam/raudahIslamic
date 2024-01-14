const functions = require('firebase-functions');
const axios = require('axios');

exports.solatProxy = functions.https.onRequest(async (req, res) => {
    const apiUrl = 'https://api.waktusolat.app/solat';

    try {
        const response = await axios.get(apiUrl);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});