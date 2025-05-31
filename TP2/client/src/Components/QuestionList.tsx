import React from 'react';
import { useAppDispatch } from '../hooks';
import { Question } from '../types';
import { likeQuestion } from '../store/questionsSlice';

interface Props {
  questions?: Question[];
  likedQuestions: string[];
  setLikedQuestions: (ids: string[]) => void;
  eventId: string;
}

export default function QuestionList({
  questions = [],
  likedQuestions,
  setLikedQuestions,
  eventId,
}: Props) {
  const dispatch = useAppDispatch();

  // Filtrage local par eventId (si pas déjà filtré en amont)
  const filteredQuestions = questions.filter(q => q.eventId === eventId);
console.log('Filtered questions for eventId', eventId, ':', filteredQuestions);
  const handleLike = (questionId: string) => {
    if (likedQuestions.includes(questionId)) return;

    dispatch(likeQuestion(questionId));

    const updated = [...likedQuestions, questionId];
    setLikedQuestions(updated);
    localStorage.setItem('likedQuestions', JSON.stringify(updated));
  };

  return (
    <div className="space-y-3 max-w-2xl mx-auto">
      {filteredQuestions.map(q => (
        <div
          key={q.id}
          className="bg-white shadow-md p-4 rounded flex justify-between items-center"
        >
          <span className="text-left text-gray-800">
            <strong className="block text-sm text-blue-600">{q.author} :</strong> {q.content}
          </span>
          <button
            onClick={() => handleLike(q.id)}
            className="bg-green-300 hover:bg-green-400 text-black font-medium px-3 py-1 rounded transition"
            disabled={likedQuestions.includes(q.id)}
            aria-pressed={likedQuestions.includes(q.id)}
            aria-label={`Aimer la question de ${q.author}`}
          >
            👍 {q.likes}
          </button>
        </div>
      ))}
    </div>
  );
}
