import Emoji from "./emoji"


export default function CommentContent({ emoji, username, participatedInAssembly, createdAt, text }) {

    return (
        <div className="is-flex p-4 comment" >
            <div className="is-flex-grow-1 is-flex-shrink-1">
                <div className="is-flex">
                    <div className="py-2 pl-0 mr-1 is-hidden-desktop">
                        <div className='avatar' />
                    </div>
                    <div>
                        <div className="user-name " ><Emoji emoji={emoji} />
                            <p className="is-inline is-size-5  pl-2 has-text-weight-bold">
                                {username}
                            </p>
                            {participatedInAssembly && <span className="is-size-7 has-text-grey ml-3">
                                Participante de asamblea
                            </span>}
                        </div>
                        <p className="has-text-grey is-size-7">fecha: {new Date(createdAt).toLocaleString('es-ES')}</p>
                    </div>
                </div>
                <p className="has-text-grey my-2 is-size-7-touch">{text}</p>
            </div>
        </div>
    )
} 
