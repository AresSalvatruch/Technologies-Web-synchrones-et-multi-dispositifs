import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from './questionsSlice';
import eventsReducer from './slices/eventsSlice'; // <-- Ajout du reducer par événement
import socketMiddleware from './midlware/middleware'; // <-- Middleware socket.io

export const store = configureStore({
  reducer: {
    questions: questionsReducer,     // Gestion globale (ex: affichage toutes questions)
    events: eventsReducer,           // Gestion par eventId (ex: admin panel)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware), // Ajout du middleware socket.io
});

// Types utiles pour TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
