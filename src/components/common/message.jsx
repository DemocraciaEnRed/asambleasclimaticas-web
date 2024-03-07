'use client'
import { Remark } from "react-remark";

import { useAlert } from "@/context/alert-context";


export default function Message() {

  const { alerts, removeAlert } = useAlert()

  if (alerts) return (
    <article className={`alert-message message is-active is-${alerts.type}`}>
      <div className="message-body is-flex is-justify-content-space-between has-background-white">
        <div className="content m-0">
          <Remark>
            {alerts.message}
          </Remark>
        </div>
        {alerts.closable && <button onClick={removeAlert} className={`delete has-background-${alerts.type}`} aria-label="delete"></button>}
      </div>
    </article>
  )
}