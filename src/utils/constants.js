import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faSquarePollHorizontal } from "@fortawesome/free-solid-svg-icons";

export const CARD_PARTICIPATIVO = [
    {
        icon: faWhatsapp,
        title_es: 'Comunidad de Whatsapp',
        title_pt: '*Comunidade do WhatsApp',
        description_es: 'Unase a la comunidad de whatsapp para conocer las novedades',
        description_pt: '*Junte-se à comunidade do WhatsApp para ficar por dentro das novidades',
        button_text: 'unite',
        button_action: ''
    },
    {
        icon: faPenToSquare,
        title_es: 'Aporte en las máximas',
        title_pt: 'Aporte nas máximas',
        description_es: 'Deja tus opiniones y valora las maximas',
        description_pt: '*Deixe suas opiniões e avalie as máximas.',
        button_text: 'aporte',
        button_action: ''
    },
    {
        icon: faSquarePollHorizontal,
        title_es: 'Deja tus opiniones y valora las maximas ',
        title_pt: '*Deixe suas opiniões e avalie as máximas.',
        description_es: 'Responda las encuestas relámpago sobre las temáticas',
        description_pt: '*Responda as pesquisas relâmpago sobre os temas.',
        button_text: 'responde',
        button_action: ''
    }
]

export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECTID