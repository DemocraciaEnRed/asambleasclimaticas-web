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
        city: "Por definir",
        date: "marzo-mayo 2024",
        topic: "Por definir",
        leader: "IDEEMOS",
        description: "",
        progress: 50,
    },
    {
        name: "Colombia",
        code: "CO",
        image: "https://cdn-icons-png.flaticon.com/512/197/197575.png",
        city: "Buenaventura",
        date: "mayo-julio 2024",
        topic: "Por definir",
        leader: "Ideemos y Extituto",
        description: "",
        progress: 75,
    },
    {
        name: "Argentina",
        code: "AR",
        image: "https://cdn-icons-png.flaticon.com/512/197/197573.png",
        city: "Por definir",
        date: "febrero–marzo 2024",
        topic: "Por definir",
        leader: "Democracia en Red",
        description: "",
        progress: 100,
    },
    {
        name: "México",
        code: "MX",
        image: "https://cdn-icons-png.flaticon.com/512/197/197397.png",
        city: "Monterrey (zona metropolitana)",
        date: "septiembre-noviembre 2024",
        topic:
            "Cambio Climático en la zona metropolitana. Programa Estatal de Cambio Climático",
        leader: "SUR, Instituto del Sur Urbano",
        description:
            "La Asamblea Climática de Nuevo León está integrada por 50 personas ciudadanas seleccionadas al azar, por medio de un mecanismo de sorteo cívico, que se reúnen para deliberar mejoras a las políticas ambientales urbanas para la Zona Metropolitana de Monterrey, en forma de desafío público.",
        progress: 25,
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
        button_action: `/pacto/${PROJECT_ID}/articulado/#articles_pacto`
    },
    {
        icon: 'pencil.svg',
        title_es: 'Aportes',
        title_pt: '*Contribuições',
        description_es: 'Deja sugerencias y aportes específicos en cada máxima',
        description_pt: '*Deixe sugestões e contribuições específicas em cada máxima',
        button_text: 'aporte',
        button_action: `/pacto/${PROJECT_ID}/articulado/#comment_section`
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