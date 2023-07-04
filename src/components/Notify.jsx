import React from 'react'
import { useSelector } from 'react-redux'

export default function Notify() {
    const notify = useSelector((state) => state.notify)
  return (
<>
          <div className="d-flex justify-content-center align-items-center ">
              <div className="alert alert-primary" role="alert">
                  {notify}
            </div>
        
          </div>

</>
  )
}
