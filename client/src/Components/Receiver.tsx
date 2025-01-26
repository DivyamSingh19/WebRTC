import React, { useEffect } from 'react'

const Receiver = () => {
    
     useEffect(()=>{
            const socket = new WebSocket('ws://localhost:8080');
            socket.onopen= () => {
                socket.send(JSON.stringify({type: 'receiver'}))
            }
        

        socket.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            if(message.type === 'createOffer'){
                //create answer
                const pc = new RTCPeerConnection();
                pc.setRemoteDescription(message.sdp);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);
                socket.send(JSON.stringify({type:'createAnswer',sdp:pc.localDescription}))
            }
        }

    },[])
  return (//in a 1-1 call you dont neeed a button per se to start the video it can be automatically triggered when it receives an offer
    <div>
      Receiver
    </div>
  )
}

export default Receiver

