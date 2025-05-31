// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { Event, ListEvents } from "../types";
import EventCard from "../Components/EventCard"

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Récupération des événements depuis le fichier types
    setEvents(ListEvents);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Événements disponibles</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />) 
        ) : (
          <p>Aucun événement disponible.</p>
        )}
      </div>
    </div>
  );
}
