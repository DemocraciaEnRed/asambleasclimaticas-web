'use client'
import { store } from "@/store";
import { setMessage } from "@/store/reducers/alert";
import { useSelector } from "react-redux";
import { Remark } from "react-remark";

const Message = () => {
  const alert = useSelector(state => state.alert)

  if (alert && alert.show) return (
    <article className={`alert-message message ${alert.show ? 'is-active' : ''} is-${alert.type}`}>

      <div className="message-body is-flex is-justify-content-space-between has-background-white">
        <div className="content m-0">
          <Remark>
            {alert.message}
          </Remark>
        </div>
        <button onClick={() => setMessage({ message: '' })} className={`delete has-background-${alert.type}`} aria-label="delete"></button>
      </div>
    </article>
  )
}

export default Message