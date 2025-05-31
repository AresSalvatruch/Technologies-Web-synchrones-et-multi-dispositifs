import React, { useEffect, useRef } from "react";
import recognizer, { Point } from "../recognizer";

export default function GestureCanvas({ onGesture }: { onGesture: (name: string) => void }) {
  const [drawing, setDrawing] = useState(false);
  const points = useRef<Point[]>([]);
  const id = useRef(0);

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDrawing(true);
    points.current = [];
    id.current += 1;
    addPoint(e);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!drawing) return;
    addPoint(e);
  };

  const handleEnd = () => {
    setDrawing(false);
    const result = recognizer.recognize(points.current);
    if (result.score > 0.8) {
      onGesture(result.name);
    }
  };

  const addPoint = (e: React.MouseEvent | React.TouchEvent) => {
    const pos = "touches" in e ? e.touches[0] : e;
    const x = pos.clientX;
    const y = pos.clientY;
    points.current.push(new Point(x, y, id.current));
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-transparent"
      onMouseDown={handleStart}
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
    />
  );
}
