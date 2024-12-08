const express = require('express');
const axios = require('axios');
const app = express();

// Setup your KeyAuth API credentials here
const KEYAUTH_APP_NAME = 'YourAppName';
const KEYAUTH_OWNER_ID = 'YourOwnerID';
const KEYAUTH_VERSION = '1.0';

app.use(express.json());

// Endpoint to generate a key
app.post('/generate-key', async (req, res) => {
    try {
        // Make API request to KeyAuth to generate a new key
        const response = await axios.post('https://keyauth.cc/api/sell', {
            name: KEYAUTH_APP_NAME,
            ownerid: KEYAUTH_OWNER_ID,
            version: KEYAUTH_VERSION,
            // Add additional data here as needed
        });

        // Return the generated key
        res.json({ key: response.data.key });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to generate key.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
