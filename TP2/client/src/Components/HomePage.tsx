// src/pages/HomePage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Event, ListEvents } from "../types";
import EventCard from "../Components/EventCard";

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();
  const eventId = events.length > 0 ? events[0].id : "";

  useEffect(() => {
    setEvents(ListEvents);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8 relative">
      {/* Bouton Admin fixé en haut à droite de la page */}
      <div className="fixed top-6 right-6 z-50">
        <button
          onClick={() => navigate(`/admin/${eventId}`)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          🛠️ Accès Admin
        </button>
      </div>

      {/* Titre centré */}
      <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-10">
        🎉 Événements disponibles
      </h1>

      {/* Liste des événements */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p className="text-gray-500 text-lg">Aucun événement disponible.</p>
        )}
      </div>
    </div>
  );
}
