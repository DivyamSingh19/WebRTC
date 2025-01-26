import React, { useEffect ,useState } from 'react'

const Sender = () => {
    const [socket,setSocket] = useState<WebSocket | null>(null);
    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:8080')
        socket.onopen= () => {
            socket.send(JSON.stringify({type: 'sender'}))
        }
    },[])
async function startSendingVideo(){
        if(!socket) return;
        //create an offer
        const pc = new RTCPeerConnection();
        const offer = await pc.createOffer();//sdp
        await pc.setLocalDescription(offer);
        socket?.send(JSON.stringify({type:'createOffer',sdp: pc.localDescription}));


        socket.onmessage= (event)=>{
            const data = JSON.parse(event.data)
            if(data.type === "createAnswer"){
                pc.setRemoteDescription(data.sdp);
            }
        }
    }
  return (
    <div>
      <button onClick={startSendingVideo}>Send Video</button>
    </div>
  )
}

export default Sender
