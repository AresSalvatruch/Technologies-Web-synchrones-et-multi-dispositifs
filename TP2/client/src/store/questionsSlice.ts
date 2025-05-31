// questionsSlice.ts (ou .js)
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Question } from '../types';

interface QuestionsState {
  questions: Question[];
}

const initialState: QuestionsState = {
  questions: [],
};

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions(state, action: PayloadAction<Question[]>) {
      console.log('Reducer setQuestions called with:', action.payload); // <== DEBUG
      state.questions = action.payload;
    },
    likeQuestion(state, action: PayloadAction<string>) {
      // ta logique like ici
    },
    addQuestion(state, action: PayloadAction<Question>) {
      // ta logique add ici
    },
  },
});

export const { setQuestions, likeQuestion, addQuestion } = questionsSlice.actions;
export default questionsSlice.reducer;
