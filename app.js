require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const kb = require('./config/knowledge_base');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'laspircas_token_seguro';
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN; 

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
    
    // --- DIAGNÓSTICO: ESTA LÍNEA MOSTRARÁ TODO LO QUE LLEGUE ---
    console.log("📨 ¡LLEGÓ ALGO!", JSON.stringify(body, null, 2));
    // ------------------------------------------------------------

    // Soporte para ambos formatos (Instagram Product y Messenger Product)
    const isInstagram = body.object === 'instagram';
    const isPage = body.object === 'page';

    if (isInstagram || isPage) {
        for (const entry of body.entry) {
            if (entry.messaging) {
                const webhookEvent = entry.messaging[0];
                const senderId = webhookEvent.sender.id;
                
                if (webhookEvent.message && webhookEvent.message.text) {
                    const text = webhookEvent.message.text.toLowerCase();
                    console.log(`✅ Mensaje procesado de ${senderId}: ${text}`);
                    await processMessage(senderId, text);
                }
            }
        }
        res.status(200).send('EVENT_RECEIVED');
    } else {
        console.log("⚠️ Recibido pero no es formato Instagram/Page reconocido");
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

    try {
        await sendMessage(senderId, reply);
    } catch (error) {
        console.error('❌ Error enviando:', error.response ? error.response.data : error.message);
    }
}

async function sendMessage(senderId, text) {
    if (!PAGE_ACCESS_TOKEN) return console.log("NO TOKEN:", text);

    await axios({
        method: 'POST',
        url: `https://graph.facebook.com/v19.0/me/messages`,
        params: { access_token: PAGE_ACCESS_TOKEN },
        data: {
            recipient: { id: senderId },
            message: { text: text }
        }
    });
}

app.listen(PORT, () => console.log(`Bot Diagnóstico corriendo en puerto ${PORT}`));
