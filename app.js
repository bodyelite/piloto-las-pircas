require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const kb = require('./config/knowledge_base');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'laspircas_token_seguro';
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN; 

app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

app.post('/webhook', async (req, res) => {
    const body = req.body;

    if (body.object) {
        if (body.entry && 
            body.entry[0].changes && 
            body.entry[0].changes[0].value.messages && 
            body.entry[0].changes[0].value.messages[0]) {

            const messageObj = body.entry[0].changes[0].value.messages[0];
            const from = messageObj.from;
            const msgBody = messageObj.text ? messageObj.text.body.toLowerCase() : '';
            const msgId = messageObj.id;

            console.log(`Mensaje de ${from}: ${msgBody}`);

            await processMessage(from, msgBody, msgId);
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

async function processMessage(to, text, messageId) {
    let reply = kb.defaultResponse;
    
    for (const service of kb.services) {
        if (service.keywords.some(keyword => text.includes(keyword))) {
            reply = service.response;
            break;
        }
    }

    try {
        await sendMessage(to, reply);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

async function sendMessage(to, text) {
    if (!WHATSAPP_TOKEN) return console.log("Simulación (No Token):", text);

    await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v17.0/753706897835148/messages`,
        headers: {
            'Authorization': `Bearer ${WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: {
            messaging_product: 'whatsapp',
            to: to,
            text: { body: text }
        }
    });
}

app.listen(PORT, () => console.log(`Strip Las Pircas Bot corriendo en puerto ${PORT}`));
