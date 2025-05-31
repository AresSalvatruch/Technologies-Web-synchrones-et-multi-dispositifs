import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import socket from '../socket';
import { Question } from '../types';
import AdminQuestionList from './AdminQuestionList';

export default function AdminView() {
  const { eventId } = useParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!eventId) return;

    socket.emit('joinEvent', eventId);
    socket.on('questions', setQuestions);

    return () => {
      socket.emit('leaveEvent', eventId);
      socket.off('questions');
    };
  }, [eventId]);

  return (
    <div className="p-6 min-h-screen bg-gray-100 flex flex-col items-center text-center">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        🛠️ Panneau Administrateur
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button
          onClick={() => navigate('/home')}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          🗂️ Home
        </button>

        <button
          onClick={() => navigate(`/participant/${eventId}`)}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
        >
          👤 Participant
        </button>

        <select
          className="px-6 py-3 rounded-lg border border-gray-300 shadow text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={e => navigate(`/admin/${e.target.value}`)}
          value={eventId}
        >
          <option value="">🎯 Sélectionner un événement</option>
          <option value="event1">📅 Événement 1</option>
          <option value="event2">📅 Événement 2</option>
          <option value="event3">📅 Événement 3</option>
        </select>
      </div>

      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-4">
        <AdminQuestionList questions={questions} eventId={eventId || ''} />
      </div>
    </div>
  );
}
