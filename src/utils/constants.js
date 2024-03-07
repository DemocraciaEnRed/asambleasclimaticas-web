import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faPenToSquare, faSquarePollHorizontal, faClipboardCheck, faLock, faPaperPlane } from "@fortawesome/free-solid-svg-icons";


export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECTID || 'pacto-inter-ciudad'

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

export const ALIANZAS = ['delibera', 'extituto', 'sur', 'demos', 'der']

export const NEW_PASSWORD_TITLE = {
    prevSend: {
        title: 'Ingresa Tu nueva Contraseña',
        title_pt: 'Digite sua nova senha.',
    },
    send: {
        icon: faClipboardCheck,
        title: 'Contraseña actualizada con exito!',
        title_pt: 'Senha atualizada com sucesso!',
    }
}

export const RESTORE_PASSWORD_TITLE = {
    prevSend: {
        icon: faLock,
        title: 'Recupera tu contraseña',
        title_pt: '* Recupere sua senha.',
        description: 'No te preocupes, recuperarla es fácil. Introduce tu correo electrónico y sigue las instrucciones en el correo que recibirás para restablecer tu contraseña.',
        description_pt: '* Não se preocupe, recuperá-la é fácil. Insira seu endereço de e-mail e siga as instruções no e-mail que você receberá para redefinir sua senha.'
    },
    send: {
        icon: faPaperPlane,
        title: 'Mail de restauración enviado',
        title_pt: 'E-mail de recuperação enviado.',
        description: 'En unos minutos recibirás un correo con el paso a paso para poder definir tu nueva contraseña (No te olvides de revisar en spam).',
        description_pt: ' Em alguns minutos, você receberá um e-mail com o passo a passo para definir sua nova senha. Não se esqueça de verificar na pasta de spam.'
    }
}