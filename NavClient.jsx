"use client";
import React from "react";

export default function NavClient(){
  return (
    <header className="topbar full-bleed">
      <div className="topbar-inner">
        <a href="#home" className="brand">
          <img src="/poto profil.png" alt="logo" />
          <span>BEPOOM</span>
        </a>

        <nav className="mainnav">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#gallery">Gallery</a>
          <a href="#roadmap">Roadmap</a>
        </nav>

        <div className="cta-right">
          <a href="https://t.me/PEBOOM" className="icon-pill" target="_blank" rel="noreferrer" aria-label="Telegram">
            <svg viewBox="0 0 24 24"><path d="M9.7 16.6 9.9 13.5 17.7 6.8c.3-.2-.1-.4-.5-.2L7.6 12l-3.2-1c-.7-.2-.7-.7.2-1.1L20 4.8c.6-.2 1.2.2 1 1l-2.7 13c-.2.9-.8 1.1-1.6.7l-4.6-3.4-2.2 1c-.1 0-.2 0-.2-.5Z"/></svg>
          </a>
          <a href="https://x.com" className="icon-pill" target="_blank" rel="noreferrer" aria-label="X">
            <svg viewBox="0 0 24 24"><path d="M4 3h4l5 7 6-7h1l-6 7 7 11h-4l-5-7-6 7H1l7-8L4 3Z"/></svg>
          </a>
          <a href="#" className="connect">Connect</a>
        </div>
      </div>
    </header>
  );
}
