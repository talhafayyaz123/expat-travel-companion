"use client"; // Mark this component as a Client Component

import React, { useState, useEffect } from "react";

// Cookie utility functions
const setCookie = (name: any, value: any, days = 365) => {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value};${expires};path=/`;
};

const getCookie = (name: any) => {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return null;
};

const deleteCookie = (name: any) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

function Cookies() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = getCookie("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    setCookie("cookieConsent", "accepted", 1);
    setShowBanner(false);
  };

  const handleDecline = () => {
    setCookie("cookieConsent", "declined", 1);
    setShowBanner(false);
  };

  return (
    <div style={{ backgroundColor: "#f1f1f1" }}>
      {/* <h1 style={{ color: '#1e90ff' }}>Cookies</h1>
      <p style={{ color: '#333' }}>This page explains how we use cookies.</p> */}

      {showBanner && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#ffffff",
            padding: "20px",
            textAlign: "center",
            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 99999999999,
          }}
        >
          <p style={{ color: "#333", marginBottom: "15px" }}>
            We use cookies to improve your experience. Do you accept cookies?
          </p>
          <button
            onClick={handleAccept}
            style={{
              backgroundColor: "#1e90ff",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              marginRight: "10px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            style={{
              backgroundColor: "#fff",
              color: "#1e90ff",
              border: "1px solid #1e90ff",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Decline
          </button>
        </div>
      )}
    </div>
  );
}

export default Cookies;
