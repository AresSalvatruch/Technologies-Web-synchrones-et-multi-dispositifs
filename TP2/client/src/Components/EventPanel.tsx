// src/components/EventPanel.tsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Event,ListEvents } from "../types";

export default function EventPanel() {
  const { eventId } = useParams<{ eventId: string }>();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (eventId) {
      const foundEvent = ListEvents.find((e) => e.id === eventId);
      setEvent(foundEvent || null);
    }
  }, [eventId]);

  if (!event) {
    return <div className="p-4 text-red-500">Événement introuvable</div>;
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-2">{event.name}</h2>
    </div>
  );
}
