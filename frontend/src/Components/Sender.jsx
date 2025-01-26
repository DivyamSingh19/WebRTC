import React, { useEffect } from 'react'

const Sender = () => {
    const [socket,setSocket] = useState<WebSocket|null>(null);
    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080')
        socket.onopen= () => {
            socket.send(JSON.stringyfy({type: 'sender'}))
        }
    },[])
async function startSendingVideo(){
        //create an offer
        const pc = new RTCPeerConnection();
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket?.send(JSON.stringify({type:'createOffer',sdp:pc.localDescription}))
        
    }
  return (
    <div>
      <button onClick={startSendingVideo}>Send Video</button>
    </div>
  )
}

export default Sender
