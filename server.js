const express = require('express');
const axios = require('axios');
const app = express();

// Setup your KeyAuth API credentials here
const KEYAUTH_APP_NAME = 'Nawsifsspammail';
const KEYAUTH_OWNER_ID = 'vNCzuzTjmw';
const KEYAUTH_VERSION = '1.0';
const KEYAUTH_SECRET = process.env.KEYAUTH_SECRET; // App Secret from environment variable

app.use(express.json());

// Endpoint to create a user and generate a key
app.post('/generate-key', async (req, res) => {
    try {
        const username = req.body.username; // Assuming username is sent in the body
        const password = req.body.password; // Assuming password is sent in the body

        // Make API request to KeyAuth to create a user and generate a key
        const response = await axios.post('https://keyauth.com/api/auth/create', {
            name: KEYAUTH_APP_NAME,
            ownerid: KEYAUTH_OWNER_ID,
            secret: KEYAUTH_SECRET,
            version: KEYAUTH_VERSION,
            username: username,
            password: password
        });

        // Check if the response is successful
        if (response.data.success) {
            res.json({ key: response.data.key });
        } else {
            res.status(400).json({ error: 'Failed to generate key. ' + response.data.message });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate key.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
