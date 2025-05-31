import React, { useRef, useState } from "react";
import recognizer, { Point } from "../recognizer.js";

export default function GestureCanvas({ onGesture }: { onGesture: (name: string) => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [drawing, setDrawing] = useState(false);
  const points = useRef<Point[]>([]);
  const id = useRef(0);

  const getPosition = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const isTouch = "touches" in e;
    const clientX = isTouch ? (e as React.TouchEvent).touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = isTouch ? (e as React.TouchEvent).touches[0].clientY : (e as React.MouseEvent).clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleStart = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setDrawing(true);
    points.current = [];
    id.current += 1;
    const { x, y } = getPosition(e);
    points.current.push(new Point(x, y, id.current));
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
  };

  const handleMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!drawing) return;
    const { x, y } = getPosition(e);
    points.current.push(new Point(x, y, id.current));
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  };

  const handleEnd = () => {
    setDrawing(false);
    const result = recognizer.recognize(points.current);
    if (result.score > 0.8) {
      onGesture(result.name);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-50 opacity-0"
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    />
  );
}
