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
  },
});
export const { setQuizzes } =
  quizSlice.actions;
export default quizSlice.reducer;