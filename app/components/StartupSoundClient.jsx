"use client";
import React, { useEffect } from "react";
import useStartupSound from "../hooks/useStartupSound"; // path kamu: ./useStartupSound.js

export default function StartupSoundClient() {
  const play = useStartupSound();
  useEffect(() => {
    const onFirstInteract = () => { play(); window.removeEventListener("pointerdown", onFirstInteract); };
    window.addEventListener("pointerdown", onFirstInteract, { once: true });
    return () => window.removeEventListener("pointerdown", onFirstInteract);
  }, [play]);
  return null;
}
