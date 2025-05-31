import React, { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import recognizer, { Point } from "../recognizer.js"; 

export default function GestureNavigation() {
  const [points, setPoints] = useState<Point[]>([]);
  const navigate = useNavigate();
  const { eventId } = useParams();

  const touchIdRef = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    const touch = e.touches[0];
    touchIdRef.current = touch.identifier;
    setPoints([new Point(touch.clientX, touch.clientY)]);
  }

  function handleTouchMove(e: React.TouchEvent) {
    const touch = Array.from(e.touches).find(t => t.identifier === touchIdRef.current);
    if (!touch) return;

    setPoints(prev => [...prev, new Point(touch.clientX, touch.clientY)]);
  }

  function handleTouchEnd() {
    if (points.length === 0) return;

    const result = recognizer.recognize(points);
    console.log("Gesture detected:", result);

    if (result.score > 0.8) { // seuil de confiance
      if (result.name === "Swipe Droite" && eventId) {
        const num = parseInt(eventId.replace(/\D/g, ""), 10);
        if (!isNaN(num)) {
          const nextEvent = `event${num + 1}`;
          console.log("Navigate to next:", nextEvent);
          navigate(`/event/${nextEvent}/participant`);
        }
      } else if (result.name === "Swipe Gauche" && eventId) {
        const num = parseInt(eventId.replace(/\D/g, ""), 10);
        if (!isNaN(num)) {
          if (num > 1) {
            const prevEvent = `event${num - 1}`;
            console.log("Navigate to previous:", prevEvent);
            navigate(`/event/${prevEvent}/participant`);
          } else {
            console.log("Navigate to home");
            navigate(`/`);
          }
        }
      }
    }

    setPoints([]);
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: "none", width: "100vw", height: "100vh" }}
    >
      {/* Contenu vide pour capter les gestes */}
    </div>
  );
}
