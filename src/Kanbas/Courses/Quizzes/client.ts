import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
let temp = REMOTE_SERVER;
temp = "https://" + temp;
const QUIZ_API = `${temp}/api/quizzes`;

export const fetchQuizzesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZ_API}/course/${courseId}`);
  return response.data;
}
export const fetchQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.get(`${QUIZ_API}/${quizId}`);
  return response.data;
}
export const addQuiz = async (quiz: any) => {
  const response = await axiosWithCredentials.post(QUIZ_API, quiz);
  return response.data;
}
export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZ_API}/${quiz._id}`, quiz);
  return data;
}
export const deleteQuiz = async (quizId: string) => {
  const response = await axiosWithCredentials.delete(`${QUIZ_API}/${quizId}`);
  return response.data;
}
export const setQuizAnswers = async (quizId: string, answers: any) => {
  const response = await axiosWithCredentials.put(`${QUIZ_API}/answers/${quizId}`, answers);
  return response.data;
}