import React, { useState } from 'react';
import { useAppDispatch } from '../hooks';  // ton hook typed dispatch
import { addQuestion } from '../store/questionsSlice';
import { v4 as uuidv4 } from 'uuid';
import { Question } from '../types';
import Gest from './Gest'; // Assure-toi que ce composant est bien importé
interface Props {
  eventId: string;
}

export default function QuestionForm({ eventId }: Props) {
  const [content, setContent] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newQuestion: Question = {
      id: uuidv4(),
      eventId,
      content,
      author: "user", // Remplace par l'utilisateur actuel si tu as un système d'authentification
      likes: 0,
      socketId: "",
      isAnswered: false,
    };

    dispatch(addQuestion(newQuestion));
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-6">
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Écris ta question ici..."
        className="w-full p-3 border rounded"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Envoyer
      </button>
    </form>

  );
}
