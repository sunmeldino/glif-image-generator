const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/generate-image-glif', async (req, res) => {
    const prompt = req.query.prompt || "default prompt";
    try {
        const response = await axios.post('https://simple-api.glif.app', {
            id: 'clozwqgs60013l80fkgmtf49o',  // Replace with your Glif ID
            inputs: [prompt]
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GLIF_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        res.json({ image_url: response.data.output });
    } catch (error) {
        console.error('Error generating image:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to generate image');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
