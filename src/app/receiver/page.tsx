"use client"
import { useRef, useEffect, useState } from "react";

export default function Receiver() {
  const remoteVideoRef = useRef<HTMLVideoElement>(null); // Ref for remote video
  const [socket, setSocket] = useState<WebSocket | null>(null); // WebSocket state
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null); // PeerConnection state

  useEffect(() => {
    // Connect to the WebSocket server
    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("WebSocket connected");
      ws.send(JSON.stringify({ type: "receiver" })); // Register as a receiver
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    setSocket(ws);

    // Cleanup WebSocket on component unmount
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    // Create a new RTCPeerConnection
    const pc = new RTCPeerConnection();

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("Sending ICE candidate");
        socket.send(JSON.stringify({ type: "iceCandidate", candidate: event.candidate }));
      }
    };

    // Handle incoming media stream
    pc.ontrack = (event) => {
      console.log("Receiving track");
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = event.streams[0];
      }
    };

    // Handle messages from the WebSocket server
    socket.addEventListener("message", async (event) => {
      const message = JSON.parse(event.data);

      if (message.type === "createOffer") {
        console.log("Received offer SDP");
        await pc.setRemoteDescription(new RTCSessionDescription(message.sdp));

        // Create an SDP answer and send it back
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);

        socket.send(JSON.stringify({ type: "createAnswer", sdp: answer }));
      } else if (message.type === "iceCandidate") {
        console.log("Received ICE candidate");
        await pc.addIceCandidate(new RTCIceCandidate(message.candidate));
      }
    });

    setPeerConnection(pc);

    // Cleanup RTCPeerConnection on component unmount
    return () => {
      pc.close();
    };
  }, [socket]);

  return (
    <div>
      <h1 className="text-fuchsia-300 text-2xl ">Receiver</h1>
      <video className="" ref={remoteVideoRef} autoPlay playsInline></video> {/* Display remote video */}
    </div>
  );
}
