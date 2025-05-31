import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import socket from '../socket';
import { Question } from '../types';
import AdminQuestionList from './AdminQuestionList';

export default function AdminView() {
  const { eventId } = useParams(); //  Récupère eventId depuis l’URL
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    if (!eventId) return;

    socket.emit('joinEvent', eventId); // 🔁 Rejoindre la room spécifique
    socket.on('questions', setQuestions);

    return () => {
      socket.emit('leaveEvent', eventId); // (optionnel) Quitter la room
      socket.off('questions');
    };
  }, [eventId]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">🛠️ Panneau Administrateur</h1>
      <AdminQuestionList questions={questions} eventId={eventId || ''} />
    </div>
  );
}