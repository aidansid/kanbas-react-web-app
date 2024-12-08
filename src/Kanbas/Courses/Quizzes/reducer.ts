import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizzes: [],
};
const quizSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
    addQuiz: (state, { payload: quiz }) => {
      const newQuiz: any = {
        _id: quiz._id,
        title: quiz.title,
        course: quiz.course,
        description: quiz.description,
        points: quiz.points,
        startDate: quiz.startDate,
        dueDate: quiz.dueDate,
      };
      state.quizzes = [...state.quizzes, newQuiz] as any;
    },
    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter(
        (a: any) => a._id !== quizId);
    },
    updateQuiz: (state, { payload: quiz }) => {
      state.quizzes = state.quizzes.map((a: any) =>
        a._id === quiz._id ? state.quizzes : a
      ) as any;
    },
  },
});
export const { setQuizzes, addQuiz, deleteQuiz, updateQuiz } =
  quizSlice.actions;
export default quizSlice.reducer;