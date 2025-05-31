import React from 'react';
import { Question } from '../types';
import socket from '../socket';
import { useAppDispatch } from '../hooks';
import { deleteQuestion } from '../store/slices/eventsSlice';

interface Props {
  questions: Question[];
  eventId: string;
}

export default function AdminQuestionList({ questions, eventId }: Props) {
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    if (window.confirm("Supprimer cette question ?")) {
      socket.emit('deleteQuestion', { eventId, questionId: id });
      dispatch(deleteQuestion({ eventId, questionId: id }));
    }
  };

  return (
    <div>
      {questions.map(q => (
        <div key={q.id}>
          <p>{q.content}</p>
          <button onClick={() => handleDelete(q.id)}>🗑️ Supprimer</button>
        </div>
      ))}
    </div>
  );
}