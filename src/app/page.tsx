"use client";
import { useRouter } from "next/navigation";

 // Mark this as a client component


export default function Home() {
  const router = useRouter();

  return (
    <div>
      <h1>Hello, World</h1>
      <button
        onClick={() => {
          router.push("/sender");
        }}
      >
        Video Sender
      </button>
      <button
        onClick={() => {
          router.push("/receiver");
        }}
      >
        Video Receiver
      </button>
    </div>
  );
}
