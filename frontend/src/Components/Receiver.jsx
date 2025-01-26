import React, { useEffect } from 'react'

const Receiver = () => {
    const [socket,setSocket] = useEffect<WebSocket|null>(null);
     useEffect(()=>{
            const socket = new WebSocket('ws://localhost:8080')
            socket.onopen= () => {
                socket.send(JSON.stringyfy({type: 'receiver'}))
            }
        },[])

        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if(message.type === 'createOffer'){
                //create answer
            }
        }
  return (//in a 1-1 call you dont neeed a button per se to start the video it can be automatically triggered when it receives an offer
    <div>
      Receiver
    </div>
  )
}

export default Receiver

