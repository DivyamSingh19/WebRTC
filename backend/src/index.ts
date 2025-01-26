import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080});

wss.on('connection',function connection(ws){

    let senderSocket :null | WebSocket =null;          
    let receiverSocket :null | WebSocket =null;
   
    ws.on('message',function message(data:any){
        const message = JSON.parse(data);
      
        //identify as sender
        //identify as receiver
        /// create offer -> from sender
        ///create answer -> from receiver
        /// add ice candidates
        /// remove ice candidates


        if(message.type=== "identify-as-sender"){

            senderSocket =ws;

        }else if(message.type=== "identify-as-reciever"){
            receiverSocket =ws;
        }else if(message.type==="create-offer"){
            if(!receiverSocket) return;
            receiverSocket.send(JSON.stringify({type:"offer",offer:message.offer}));
        }else if(message.type==="create-answer"){
            if(!receiverSocket) return;
            receiverSocket.send(JSON.stringify({type:"offer",offer:message.offer}));
        }

    });
    
})