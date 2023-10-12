import Image from "next/image";
import React from "react";
import loading from "../assets/logo.png"

export default function Loading() {
  return (
    <div className="w-screen h-screen flex justify-center items-center flex-col">
      <Image src={loading} width={300} height={300} alt="logo" />
    </div>
  );
}