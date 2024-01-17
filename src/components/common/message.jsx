'use client'
import { store } from "@/store";
import { setMessage } from "@/store/reducers/alert";
import { useSelector } from "react-redux";

const Message = () => {
  const alert  = useSelector(state => state.alert)

  if (alert.show) return (
    <article className={`alert-message message ${alert.type}`}>

      <div className="message-body is-flex is-justify-content-space-between has-background-white">
        <p>{alert.message}</p>
        <button onClick={() => setMessage({ message: '' })} className="delete has-text-danger" aria-label="delete"></button>
      </div>
    </article>
  )
}

export default Message