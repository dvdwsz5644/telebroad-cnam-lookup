// server.js (Backend - Node.js with Express)
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow frontend requests
app.use(express.json());

const TELEBROAD_API_URL = 'https://webserv.telebroad.com/api/teleconsole/rest/cnam?number=';
const API_USERNAME = 'dweiss@telebroad.com';
const API_PASSWORD = 'dave0238676';

// Route to fetch caller name
app.get('/lookup', async (req, res) => {
    const phoneNumber = req.query.number;
    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const response = await axios.get(`${TELEBROAD_API_URL}${phoneNumber}`, {
            auth: {
                username: API_USERNAME,
                password: API_PASSWORD,
            },
        });

        res.json({ callerName: response.data });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch caller name' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
