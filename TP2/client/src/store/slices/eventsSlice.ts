// src/features/events/eventsSlice.ts
import { createSlice, PayloadAction, createAction } from '@reduxjs/toolkit';
import { Question } from '../../types';

interface EventsState {
  questionsByEvent: {
    [eventId: string]: Question[];
  };
}

const initialState: EventsState = {
  questionsByEvent: {},
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setQuestionsForEvent: (
      state,
      action: PayloadAction<{ eventId: string; questions: Question[] }>
    ) => {
      state.questionsByEvent[action.payload.eventId] = action.payload.questions;
    },
    addQuestion: (
      state,
      action: PayloadAction<{ eventId: string; question: Question }>
    ) => {
      state.questionsByEvent[action.payload.eventId] ??= [];
      state.questionsByEvent[action.payload.eventId].push(action.payload.question);
    },
    deleteQuestion: (
      state,
      action: PayloadAction<{ eventId: string; questionId: string }>
    ) => {
      state.questionsByEvent[action.payload.eventId] =
        state.questionsByEvent[action.payload.eventId]?.filter(
          (q) => q.id !== action.payload.questionId
        ) ?? [];
    },
  },
});

//  Actions pour socket.io middleware
export const requestDeleteQuestionForEvent = createAction<{ eventId: string; questionId: string }>(
  'events/requestDeleteQuestionForEvent'
);
export const joinEventRoom = createAction<string>('events/joinEventRoom');
export const leaveEventRoom = createAction<string>('events/leaveEventRoom');

//  Export du selector MEMOÏSÉ dans ce fichier (ou déplace-le dans un selectors.ts séparé)
import { createSelector } from 'reselect';
import { RootState } from '../../store';

export const selectQuestionsByEventId = (eventId: string) =>
  createSelector(
    (state: RootState) => state.events.questionsByEvent,
    (questionsByEvent) => questionsByEvent[eventId] || []
  );

//  Exports
export const { setQuestionsForEvent, addQuestion, deleteQuestion } = eventsSlice.actions;
export default eventsSlice.reducer;
