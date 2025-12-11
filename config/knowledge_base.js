const knowledgeBase = {
    businessName: "Strip Center Las Pircas",
    assistantName: "Strip Las Pircas",
    description: "Asistente virtual del centro comercial y de servicios Las Pircas.",
    location: "Av. Las Perdices 2990, Peñalolén.",
    parking: "Sí, contamos con estacionamiento gratuito para clientes.",
    hours: "Lunes a Domingo de 08:00 a 22:00 hrs.",

    systemPrompt: `
    Eres 'Strip Las Pircas', el anfitrión virtual del Strip Center Las Pircas.
    Tu objetivo es guiar a los visitantes sobre las tiendas, servicios, horarios y ubicación.
    Responde siempre de forma breve, servicial y directa.
    Si preguntan por una tienda específica, indica si está y su rubro.
    Si preguntan por 'Body Elite', menciónalo con entusiasmo como nuestra clínica estética destacada.
    No inventes tiendas que no existen.
    `,

    services: [
        {
            keywords: ["body elite", "estetica", "clinic", "masajes", "botox"],
            response: "Body Elite es nuestra Clínica Estética Premium. Ofrecen tratamientos corporales, faciales y depilación. Están en el local 10. ¿Quieres su contacto?"
        },
        {
            keywords: ["farmacia", "remedios", "medicamentos"],
            response: "Contamos con Farmacia Cruz Verde ubicada en el acceso principal. Abierta de 09:00 a 21:00."
        },
        {
            keywords: ["sushi", "comida", "restaurant", "almuerzo"],
            response: "Para comer tenemos 'Sushi House' y la cafetería 'El Grano'. Ambos tienen terraza disponible."
        },
        {
            keywords: ["gimnasio", "gym", "deporte", "entrenar"],
            response: "Sí, el gimnasio 'Energy' está en el segundo piso. Abierto desde las 07:00 AM."
        },
        {
            keywords: ["estacionamiento", "parking", "auto"],
            response: "El estacionamiento es totalmente gratuito para clientes del Strip Center."
        },
        {
            keywords: ["horario", "abierto", "cierre"],
            response: "El Strip Center abre de 08:00 a 22:00 hrs, aunque algunos locales tienen horarios específicos."
        },
        {
            keywords: ["direccion", "donde", "ubicacion", "llegar"],
            response: "Estamos en Av. Las Perdices 2990, Peñalolén. ¡Te esperamos!"
        }
    ],

    defaultResponse: "Soy el asistente de Las Pircas. Puedo informarte sobre tiendas, farmacia, gimnasio, comida o nuestra clínica Body Elite. ¿Qué necesitas?"
};

module.exports = knowledgeBase;
