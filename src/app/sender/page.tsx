"use client"
import { useRef, useEffect, useState } from "react";

export default function Sender() {
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "sender" }));
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    ws.addEventListener("message", async (event) => {
      const message = JSON.parse(event.data);

      if (peerConnection) {
        if (message.type === "createAnswer") {
          console.log("Received answer SDP");
          await peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));
        } else if (message.type === "iceCandidate") {
          console.log("Received ICE candidate");
          await peerConnection.addIceCandidate(new RTCIceCandidate(message.candidate));
        }
      }
    });

    setSocket(ws);

    return () => {
      ws.close(); // Clean up WebSocket on component unmount
    };
  }, [peerConnection]);

  const startStream = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if (localVideoRef.current) {
      localVideoRef.current.srcObject = stream;
    }

    const pc = new RTCPeerConnection();
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate");
        socket?.send(JSON.stringify({ type: "iceCandidate", candidate: event.candidate }));
      }
    };

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    socket?.send(JSON.stringify({ type: "createOffer", sdp: offer }));

    setPeerConnection(pc);
  };

  return (
    <div>
      <h1>Sender</h1>
      <video ref={localVideoRef} autoPlay playsInline muted></video>
      <button onClick={startStream}>Start Stream</button>
    </div>
  );
}
