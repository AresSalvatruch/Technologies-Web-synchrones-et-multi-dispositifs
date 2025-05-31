// src/store/middleware/socketMiddleware.ts
import { Middleware } from '@reduxjs/toolkit';
import socket from '../../socket';
import { addQuestion, setQuestions, likeQuestion } from '../questionsSlice';

const socketMiddleware: Middleware = store => {
  // Écoute socket à l'initialisation du middleware (une fois)
  socket.on('questions', (questions) => {
    store.dispatch(setQuestions(questions));
  });
socket.on("action", (action) => {
  store.dispatch(action); // applique l'action reçue
});

  return next => action => {
    if (action.type === addQuestion.type) {
      socket.emit('newQuestion', action.payload);
    }

    if (action.type === likeQuestion.type) {
      const questionId = action.payload;
      const state = store.getState();
      const question = state.questions.questions.find((q: any) => q.id === questionId);
      if (question) {
        socket.emit('likeQuestion', { eventId: question.eventId, questionId });
      }
    }

    return next(action);
  };
};

export default socketMiddleware;
