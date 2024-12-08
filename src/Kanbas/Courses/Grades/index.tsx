import { Navigate } from "react-router-dom";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as quizClient from "../Quizzes/client";

export default function Grades() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [quizzes, setQuizzes] = useState([]);

  const routeChange = (qid: string) => {
    navigate(`/Kanbas/Courses/${cid}/Grades/${qid}`);
  };

  const fetchQuizzes = async () => {
    const quizzes = await quizClient.fetchQuizzesForCourse(cid as string);
    // get all quizzes that have been attempted by the current user
    setQuizzes(quizzes.filter((q: any) => q.published && q.attempts.filter((a: any) => a.user === currentUser._id)));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes">
      {(quizzes && quizzes.length > 0) && 
        <><ul id="wd-quizzes" className="list-group rounded-0">
          <li className="wd-assignment list-group-item p-0 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-light">
              Grades
            </div>
          </li>
        </ul>
        <ul className="wd-lessons list-group rounded-0">
          {quizzes.map((quiz: any) => (
            <div key={quiz._id} className="wd-lesson list-group-item">
              <span className="title" style={{ textDecoration: "none", color: "black" }} onClick={() => routeChange(quiz._id as string)}>
                <b>{quiz.title}</b>
              </span>
              <br />
              &nbsp;&nbsp;QUIZZES | {quiz.attempts.length > 0 ? quiz.attempts.filter((a: any) => a.user === currentUser._id)[0].attemptsRemaining : quiz.howManyAttempts} attempts remaining
              {quiz.attempts.length > 0 ? ` | ${quiz.attempts.filter((a: any) => a.user === currentUser._id)[0].score} / ${quiz.points} pts` : ``}
            </div>
          ))}
        </ul></>
      }
    </div>
  );
}