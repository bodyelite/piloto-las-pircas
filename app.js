require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const kb = require('./config/knowledge_base');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook', async (req, res) => {
    const body = req.body;

    if (body.object === 'instagram' || body.object === 'page') {
        for (const entry of body.entry) {
            if (entry.messaging) {
                const webhookEvent = entry.messaging[0];
                const senderId = webhookEvent.sender.id;

                if (webhookEvent.message && webhookEvent.message.text) {
                    const text = webhookEvent.message.text.toLowerCase();
                    await processMessage(senderId, text);
                }
            }
        }
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

async function processMessage(senderId, text) {
    let reply = kb.defaultResponse;

    for (const service of kb.services) {
        if (service.keywords.some(keyword => text.includes(keyword))) {
            reply = service.response;
            break;
        }
    }

    await sendMessage(senderId, reply);
}

async function sendMessage(senderId, text) {
    try {
        await axios({
            method: 'POST',
            url: `https://graph.facebook.com/v19.0/me/messages`,
            params: { access_token: PAGE_ACCESS_TOKEN },
            data: {
                recipient: { id: senderId },
                message: { text: text }
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
