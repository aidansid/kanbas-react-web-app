import { Link } from "react-router-dom";

export default function TOC() {
    return (
      <ul>
        <li><Link to="/Kanbas/Courses/1234/Quizzes/Quiz1">Quiz 1</Link></li>
        <li><Link to="/Kanbas/Courses/1234/Quizzes/Quiz2">Quiz 2</Link></li>
        <li><Link to="/Kanbas/Courses/1234/Quizzes/Quiz3">Quiz 3</Link></li>
      </ul>
    );
  }
  