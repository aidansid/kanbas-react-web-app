import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUIZ_API = `${REMOTE_SERVER}/api/quizzes`;

export const fetchQuizzesForCourse = async (courseId: string) => {
  const response = await axios.get(`${QUIZ_API}/course/${courseId}`);
  return response.data;
}

export const fetchQuiz = async (quizId: string) => {
  const response = await axios.get(`${QUIZ_API}/${quizId}`);
  return response.data;
}