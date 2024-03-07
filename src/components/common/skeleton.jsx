export default function Skeleton({column, reverseColumn, height}) {

    return (
        <div className="section skeleton my-4">
            <div className="columns">
                <div className="column">
                    <article className={`box p-0 message is-flex ${column ? 'is-flex-direction-column' : reverseColumn ? 'is-flex-direction-column-reverse' :''}`} style={{minHeight:`${height}px`}}>
                        <div className={`message-header ${column || reverseColumn ? '' : 'w-25'}`}  style={column || reverseColumn ? {minHeight:`${height*0.20}px`}:{}}>
                            <p />
                        </div>
                        <div className="message-body is-flex-grow-1" >
                            <p />
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}