import express from "express";
import bodyParser from "body-parser";
import { pensar } from "./brain.js";
import { sendMessage } from "./utils/meta.js";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const sesiones = {}; 

app.get("/webhook", (req, res) => {
    if (req.query["hub.mode"] === "subscribe" && req.query["hub.verify_token"] === process.env.VERIFY_TOKEN) {
        res.send(req.query["hub.challenge"]);
    } else {
        res.sendStatus(403);
    }
});

app.post("/webhook", async (req, res) => {
    const entry = req.body.entry?.[0];
    if (entry?.messaging?.[0]) {
        const event = entry.messaging[0];
        const senderId = event.sender.id;
        const message = event.message?.text;
        
        if (message) {
            if (!sesiones[senderId]) sesiones[senderId] = [];
            sesiones[senderId].push({ role: "user", content: message });
            
            const respuesta = await pensar(sesiones[senderId]);
            sesiones[senderId].push({ role: "assistant", content: respuesta });
            
            await sendMessage(senderId, respuesta);
        }
    }
    res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Las Pircas Bot en puerto ${PORT}`));
