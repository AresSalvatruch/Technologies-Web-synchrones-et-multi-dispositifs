import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import GestureCanvas from "./GestureCanvas";

export default function GestureNavigation() {
  const navigate = useNavigate();
  const { eventId } = useParams();

  const handleGesture = (name: string) => {
    console.log("Gesture recognized:", name);
    const num = parseInt(eventId?.replace(/\D/g, "") || "0", 10);

    if (name === "Swipe Droite") {
      if (!isNaN(num)) navigate(`/event/event${num + 1}/participant`);
    } else if (name === "Swipe Gauche") {
      if (!isNaN(num)) {
        if (num > 1) navigate(`/event/event${num - 1}/participant`);
        else navigate(`/`);
      }
    }
  };

  return <GestureCanvas onGesture={handleGesture} />;
}
