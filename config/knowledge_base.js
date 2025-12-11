const knowledgeBase = {
    businessName: "Strip Center Las Pircas",
    assistantName: "Strip Las Pircas",
    description: "Asistente virtual del centro comercial y de servicios Las Pircas.",
    location: "Av. Las Perdices 2990, Peñalolén.",
    
    systemPrompt: `
    Eres 'Strip Las Pircas', el anfitrión virtual del Strip Center.
    Tu objetivo es guiar a los visitantes sobre las tiendas, servicios y comodidades.
    Responde siempre de forma breve, servicial y directa.
    Promociona 'Body Elite' (Local 23) con entusiasmo cuando sea relevante.
    Destaca la seguridad y comodidad del lugar (estacionamientos, ascensor).
    `,

    services: [
        {
            keywords: ["body elite", "estetica", "clinic", "masajes", "botox", "rejuvenecimiento"],
            response: "¡Body Elite es nuestra joya! Clínica Estética Premium ubicada en el Local 23. Ofrecen tratamientos corporales, faciales y depilación láser."
        },
        {
            keywords: ["farmacia", "remedios", "medicamentos", "ahumada"],
            response: "Tenemos 2 opciones para ti: Farmacia Ahumada y una farmacia particular con atención personalizada."
        },
        {
            keywords: ["uniforme", "vms", "colegio", "escolar", "ropa"],
            response: "Encuentras 'VMS' en el Local 24. Tienen los uniformes oficiales de los 3 colegios de mejor perfil del sector."
        },
        {
            keywords: ["muebles", "cuadros", "decoracion", "hogar"],
            response: "Para el hogar tenemos un local exclusivo de venta de muebles y otro especializado en cuadros y arte."
        },
        {
            keywords: ["uñas", "manicure", "pedicure", "barberia", "corte", "pelo", "belleza"],
            response: "Para tu imagen contamos con 2 barberías y 2 locales especializados en uñas y manicure."
        },
        {
            keywords: ["mascota", "perro", "gato", "veterinaria", "animal"],
            response: "Amamos a las mascotas: tenemos 1 clínica veterinaria completa y 2 tiendas de productos para mascotas."
        },
        {
            keywords: ["comida", "pizza", "sushi", "cafe", "almuerzo", "restaurant"],
            response: "Para comer hay variedad: 1 pizzería, 2 cafeterías para relajarse, y opciones de sushi."
        },
        {
            keywords: ["gimnasio", "gym", "deporte", "entrenar"],
            response: "Sí, contamos con un gimnasio totalmente equipado para tu entrenamiento."
        },
        {
            keywords: ["estacionamiento", "parking", "auto", "seguridad", "ascensor", "vigilancia"],
            response: "El Strip Center es muy cómodo y seguro: más de 50 estacionamientos, vigilancia permanente y ascensor para acceso universal."
        },
        {
            keywords: ["direccion", "donde", "ubicacion", "llegar"],
            response: "Estamos en Av. Las Perdices 2990, Peñalolén. ¡Te esperamos!"
        }
    ],

    defaultResponse: "Soy el asistente de Las Pircas. Tenemos farmacias, VMS (uniformes), Body Elite (Local 23), comida, veterinaria y más. ¿Qué buscas hoy?"
};

module.exports = knowledgeBase;
