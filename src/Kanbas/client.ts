import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
let temp = REMOTE_SERVER;
temp = "https://" + temp;
const ENROLL_API = `${temp}/api/enrollments`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLL_API}/enroll`, { userId, courseId });
  return response.data;
}

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${ENROLL_API}/unenroll/${userId}/${courseId}`);
  return response.data;
}