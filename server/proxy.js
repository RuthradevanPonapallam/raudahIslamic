const axios = require('axios');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes

app.get('/solat', (req, res) => {
    const apiUrl = 'https://api.waktusolat.app/solat';
    axios.get(apiUrl)
        .then(response => res.json(response.data))
        .catch(error => res.status(500).json({ error: error.message }));
});

app.listen(3000, () => {
    console.log('Proxy server listening on port 3000');
});