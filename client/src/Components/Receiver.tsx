import { useEffect } from "react";

export const Receiver = () => {
    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8080");

        socket.onopen = () => {
            console.log("WebSocket connection opened.");
            socket.send(JSON.stringify({ type: "receiver" }));
        };

        const pc = new RTCPeerConnection();

        // Create a video element to display the received stream
        const video = document.createElement("video");
        video.autoplay = true;
        video.style.width = "100%";
        video.style.height = "auto";
        document.body.appendChild(video);

        const mediaStream = new MediaStream();
        video.srcObject = mediaStream;

        // Add incoming tracks to the MediaStream
        pc.ontrack = (event) => {
            console.log("Track received:", event.track.kind);
            mediaStream.addTrack(event.track);
        };

        // Handle incoming WebSocket messages
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            if (message.type === "createOffer") {
                pc.setRemoteDescription(new RTCSessionDescription(message.sdp))
                    .then(() => pc.createAnswer())
                    .then((answer) => {
                        pc.setLocalDescription(answer);
                        socket.send(JSON.stringify({
                            type: "createAnswer",
                            sdp: answer,
                        }));
                    });
            } else if (message.type === "iceCandidate") {
                pc.addIceCandidate(new RTCIceCandidate(message.candidate));
            }
        };

        // Handle ICE candidates
        pc.onicecandidate = (event) => {
            if (event.candidate) {
                socket.send(JSON.stringify({
                    type: "iceCandidate",
                    candidate: event.candidate,
                }));
            }
        };
    }, []);

    return <div></div>;
};
