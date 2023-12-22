'use client'
import { Remark } from "react-remark"


export default function MkdFormatter({source}){

  return(
    <div className="content">
      <Remark>
        {source}
      </Remark>
    </div>
    )
}