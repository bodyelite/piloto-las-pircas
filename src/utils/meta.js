import axios from "axios";
export async function sendMessage(to, text) {
  try {
    await axios.post(`https://graph.facebook.com/v19.0/me/messages`, 
    { recipient: { id: to }, message: { text: text } }, 
    { params: { access_token: process.env.PAGE_ACCESS_TOKEN } });
  } catch (e) { console.error("Error IG:", e.message); }
}
export async function getWhatsAppMediaUrl(mediaId) { return null; }
