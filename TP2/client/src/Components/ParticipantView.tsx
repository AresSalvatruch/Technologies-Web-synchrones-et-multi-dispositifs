
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import socket from "../socket";
import { Event, Question, ListEvents } from "../types";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import Gest from "./Gest";
import GestureCanvas from "./GestureCanvas";
import { useNavigate } from "react-router-dom"; 
import GestureNavigation from "./GestureNavigation";

export default function ParticipantView() {
  const { eventId } = useParams<{ eventId?: string }>();
  const navigate = useNavigate(); // 👈
  const [questions, setQuestions] = useState<Question[]>([]);
  const [likedQuestions, setLikedQuestions] = useState<string[]>(() => {
    const stored = localStorage.getItem("likedQuestions");
    return stored ? JSON.parse(stored) : [];
  });

  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (eventId) {
      const found = ListEvents.find((e) => e.id === eventId);
      setEvent(found || null);
      socket.emit('joinEvent', eventId);
      socket.on('questions', (receivedQuestions: Question[]) => {
        setQuestions(receivedQuestions);
      });
      return () => {
        socket.off('questions');
      };
    }
  }, [eventId]);
const handleGesture = (gesture: string) => {
  const index = ListEvents.findIndex((e) => e.id === eventId);
  if (gesture === "Swipe Droite" && index < ListEvents.length - 1) {
    navigate(`/participant/${ListEvents[index + 1].id}`);
  } else if (gesture === "Swipe Gauche" && index > 0) {
    navigate(`/participant/${ListEvents[index - 1].id}`);
  }
};

  if (!eventId || !event) {
    return <div className="p-6 text-red-500">Événement introuvable.</div>;
  }

  return (
    <div className="p-6 min-h-screen bg-blue-100 text-center relative">
      <h1 className="text-3xl font-bold text-blue-700 mb-2">
        🎤 Pose ta question pour : {event.name}
      </h1>
      <p className="text-gray-600 mb-6">📅 Date : {event.date}</p>

      <QuestionForm eventId={eventId} />
      <QuestionList
        questions={questions}
        likedQuestions={likedQuestions}
        setLikedQuestions={setLikedQuestions}
        eventId={eventId}
      />
      <GestureNavigation />
      <GestureCanvas onGesture={handleGesture} />
      


    
    </div>
  );
  
}
