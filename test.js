const kb = require('./config/knowledge_base');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("\x1b[36m%s\x1b[0m", "\n--- SIMULADOR: Strip Las Pircas ---");
console.log("Prueba frases como: 'donde queda', 'farmacia', 'tienen sushi', 'body elite'");
console.log("(Escribe 'salir' para terminar)\n");

rl.on('line', (input) => {
    if (input.trim().toLowerCase() === 'salir') {
        rl.close();
        return;
    }

    const text = input.toLowerCase();
    let reply = kb.defaultResponse;

    for (const service of kb.services) {
        if (service.keywords.some(keyword => text.includes(keyword))) {
            reply = service.response;
            break;
        }
    }

    console.log(`\x1b[32mBot:\x1b[0m ${reply}\n`);
});
