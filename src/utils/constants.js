export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECTID || 'pacto-inter-ciudad'
// export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://zj437s00-3000.brs.devtunnels.ms/'
// export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'
export const API_URL = 'https://api.resurgentes.org'
export const AUTH_TOKENS_KEY = "RES_AUTH";


export const STAGE_COUNTRY_LIST = [
    {
        name: "Brasil",
        code: "BR",
        image: "https://cdn-icons-png.flaticon.com/512/197/197386.png",
        city: "Bujarú",
        date: "Abril a Mayo de 2024",
        topic: "Bioeconomía Sostenible, renta y calidad de vida en la Amazonia",
        leader: "Delibera Brasil",
        description: "La Asamblea Climática de Bujaru está formada por 50 vecinos provenientes de la ciudad, incluyendo las comunidades tradicionales, que se reunieron para comprender el contexto, oportunidades y riesgos de la crisis climática en un proceso deliberativo para enviar al gobierno recomendaciones de políticas públicas e inversiones privadas en Bioeconomía Sostenible con generación de ingresos y calidad de vida para todos los que habitan en Bujaru.",
        progress: 25,
    },
    {
        name: "Argentina",
        code: "AR",
        image: "https://cdn-icons-png.flaticon.com/512/197/197573.png",
        city: "Mar del Plata",
        date: "Agosto de 2024",
        topic: "Plan estratégico de acción climática municipal. Orientado a mitigar el impacto del cambio climático a nivel local.",
        leader: "Democracia en Red",
        description: "La Asamblea Climática de Mar del Plata está integrada por 50 personas seleccionadas al azar mediante un sorteo cívico, formando una muestra representativa de la población de la ciudad. Estas personas se reunirán para deliberar y emitir recomendaciones sobre el nuevo plan de acción climática de la Municipalidad de General Pueyrredón. Se buscarán aportes sobre tres ejes del PAC:<br/><br/>A) Formación, concientización y creación de políticas impulsadas por la comunidad.<br/>B) Tratamiento de residuos sólidos y efluentes, reutilización de materiales y reciclaje.<br/>C) Prevención y preparación para emergencias de eventos catastróficos relacionados con la crisis climática, y medidas de adaptación al cambio climático.",
        progress: 50,
    },
    {
        name: "Colombia",
        code: "CO",
        image: "https://cdn-icons-png.flaticon.com/512/197/197575.png",
        city: "Buenaventura",
        date: "Agosto 2024",
        topic: "Recolección y transformación de residuos sólidos",
        leader: "Extituto",
        description: "La Asamblea Climática de Buenaventura está integrada por 50 personas seleccionadas al azar mediante un sorteo cívico, formando una muestra representativa de la población de la zona rural y urbana. Estas personas se reunirán para deliberar y emitir recomendaciones sobre la recolección y transformación de residuos sólidos en el distrito.",
        progress: 75,
    },
    {
        name: "México",
        code: "MX",
        image: "https://cdn-icons-png.flaticon.com/512/197/197397.png",
        city: "Monterrey, Nuevo León",
        date: "Septiembre a Noviembre de 2024",
        topic: "Cambio Climático en la zona metropolitana. Programa Estatal de Cambio Climático",
        leader: "SUR, Instituto del Sur Urbano",
        description: "La Asamblea Climática de Nuevo León está integrada por 50 personas ciudadanas, seleccionadas al azar mediante un sorteo cívico, que se reúnen para deliberar y emitir recomendaciones para mejorar las políticas ambientales del Estado, así como para priorizar las medidas de acción para la adaptación al Cambio Climático en la Zona Metropolitana de Monterrey.",
        progress: 100,
    },
];

export const BANNER_BACKGROUND = [
    'banner_argentina.jpg',
    'banner_brasil.jpg',
    'banner_colombia.png',
    'banner_mexico.jpg'
]

export const CARD_PARTICIPATIVO = [
    /* {
        icon: faWhatsapp,
        title_es: 'Comunidad de Whatsapp',
        title_pt: '*Comunidade do WhatsApp',
        description_es: 'Unase a la comunidad de whatsapp para conocer las novedades',
        description_pt: '*Junte-se à comunidade do WhatsApp para ficar por dentro das novidades',
        button_text: 'unite',
        button_action: ''
    }, */
    {
        icon: 'comment.svg',
        title_es: 'Comentarios ',
        title_pt: '*Comentários',
        description_es: 'Comenta, mira y responde comentarios de otros usuarios.',
        description_pt: '*Visualize, comente e responda aos comentários de outros usuários.*',
        button_text: 'Comente',
        button_action: `/pacto/${PROJECT_ID}/articulado/#comment_section`
    },
    {
        icon: 'pencil.svg',
        title_es: 'Aportes',
        title_pt: '*Contribuições',
        description_es: 'Deja sugerencias y aportes específicos en cada máxima',
        description_pt: '*Deixe sugestões e contribuições específicas em cada máxima',
        button_text: 'aporte',
        button_action: `/pacto/${PROJECT_ID}/articulado/#articles_pacto`
    }

]

export const ALIANZAS = ['delibera', 'extituto', 'sur', 'demos', 'der']

export const NEW_PASSWORD_TITLE = {
    prevSend: {
        title: 'Ingresa Tu nueva Contraseña',
        title_pt: 'Digite sua nova senha.',
    },
    send: {
        icon: 'lock_success.svg',
        title: 'Contraseña actualizada con exito!',
        title_pt: 'Senha atualizada com sucesso!',
    }
}

export const RESTORE_PASSWORD_TITLE = {
    prevSend: {
        icon: 'lock.svg',
        title: 'Recupera tu contraseña',
        title_pt: '* Recupere sua senha.',
        description: 'No te preocupes, recuperarla es fácil. Introduce tu correo electrónico y sigue las instrucciones en el correo que recibirás para restablecer tu contraseña.',
        description_pt: '* Não se preocupe, recuperá-la é fácil. Insira seu endereço de e-mail e siga as instruções no e-mail que você receberá para redefinir sua senha.'
    },
    send: {
        icon: 'mail.svg',
        title: 'Mail de restauración enviado',
        title_pt: 'E-mail de recuperação enviado.',
        description: 'En unos minutos recibirás un correo con el paso a paso para poder definir tu nueva contraseña (No te olvides de revisar en spam).',
        description_pt: ' Em alguns minutos, você receberá um e-mail com o passo a passo para definir sua nova senha. Não se esqueça de verificar na pasta de spam.'
    }
}