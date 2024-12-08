import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const ENROLL_API = `${REMOTE_SERVER}/api/enrollments`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const response = await axios.post(`${ENROLL_API}/enroll`, { userId, courseId });
  return response.data;
}

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const response = await axios.delete(`${ENROLL_API}/unenroll/${userId}/${courseId}`);
  return response.data;
}