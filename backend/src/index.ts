import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
let senderSocket: WebSocket | null = null;
let receiverSocket: WebSocket | null = null;

wss.on('connection', (ws) => {
 
 ws.on('message', (data:any) => {
   try {
     const message = JSON.parse(data.toString());

     if (message.type === "identify-as-sender") {
        if(ws!==senderSocket) return
       senderSocket = ws;
       console.log("Sender set");
     } else if (message.type === "identify-as-reciever") {
        if(ws!==receiverSocket) return
       receiverSocket = ws;
       console.log("Receiver set");
     } else if (message.type === "create-offer") {
       if (!receiverSocket) return;
       receiverSocket.send(JSON.stringify({ type: "offer", offer: message.offer }));
       console.log("Offer received");
     } else if (message.type === "create-answer") {
       if (!receiverSocket) return;
       receiverSocket.send(JSON.stringify({ type: "offer", offer: message.offer }));
       console.log("Answer received");
     } else if (ws === senderSocket) {
       receiverSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
     } else if (ws === receiverSocket) {
       senderSocket?.send(JSON.stringify({ type: 'iceCandidate', candidate: message.candidate }));
     }
   } catch (error) {
     console.error('Error parsing WebSocket message:', error);
     ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
   }
 });

 
});