import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "./reducer";
import * as quizClient from "./client";
import QuizControls from "./QuizControls";
import LessonControlButtons from "./LessonControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscRocket } from "react-icons/vsc";
import { BsGripVertical } from 'react-icons/bs';
import { current } from "@reduxjs/toolkit";

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizReducer);

  const routeChange = (qid: string) => {
    if (currentUser.role === "FACULTY") {
      navigate(`/Kanbas/Courses/${cid}/Quizzes/Detail/${qid}`);
    }
    if (currentUser.role === "STUDENT") {
      const quiz = quizzes.find((q: any) => q._id === qid);
      const attempts = quiz.attempts.filter((a: any) => a.user === currentUser._id);
      if (attempts.length > 0) {
        if (attempts[0].attemptsRemaining > 0) {
          navigate(`/Kanbas/Courses/${cid}/Quizzes/Preview/${qid}`);
        }
      }
      else {
        navigate(`/Kanbas/Courses/${cid}/Quizzes/Preview/${qid}`);
      }
    }
  };

  const fetchQuizzes = async () => {
    const quizzes = await quizClient.fetchQuizzesForCourse(cid as string);
    if (currentUser.role === "STUDENT") {
      dispatch(setQuizzes(quizzes.filter((q: any) => q.published === true)));
    } else {
      dispatch(setQuizzes(quizzes));
    }
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes">
      {quizzes && (
        <><QuizControls />
        <br /><hr /><br />
        <ul id="wd-quizzes" className="list-group rounded-0">
          <li className="wd-assignment list-group-item p-0 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-light">
              <IoMdArrowDropdown className="fs-3" /> 
              Assignment Quizzes 
            </div>
          </li>
        </ul>
        <ul className="wd-lessons list-group rounded-0">
          {quizzes.map((quiz: any) => (
            <li className="wd-lesson list-group-item p-2 ps-1">
              &nbsp;&nbsp;
              <VscRocket className="me-2 fs-3" color="green"/>
              <LessonControlButtons q={quiz}/>
              <span className="title" style={{ textDecoration: "none", color: "black" }} onClick={() => routeChange(quiz._id as string)}>
                <b>{quiz.title}</b>
              </span>
              <p className="description">
                <span>
                  {new Date() > new Date(quiz.untilDate) && <b>Closed |&nbsp;</b>}
                  {new Date() >= new Date(quiz.availableDate) && new Date() <= new Date(quiz.untilDate) && (
                    <b>Available until {quiz.untilDate} |&nbsp;</b>
                  )}
                  {new Date() < new Date(quiz.availableDate) && (
                    <b>Not available until {quiz.availableDate} |&nbsp;</b>
                  )}
                  <b>Due</b> {quiz.dueDate} |&nbsp;
                  {quiz.points} points |&nbsp;
                  {quiz.questions !== undefined ? quiz.questions.length : 0} questions
                  {(quiz.attempts.length > 0 && quiz.attempts.filter((a: any) => a.user === currentUser._id) > 0) && (
                    <>
                      &nbsp;|&nbsp;{quiz.attempts.filter((a: any) => a.user === currentUser._id)[0].attemptsRemaining} attempts remaining
                    </>
                  )}
                  {(quiz.attempts.filter((a: any) => a.user === currentUser._id) === 0) && (
                    <>
                      &nbsp;|&nbsp;{quiz.howManyAttempts} attempts remaining
                    </>  
                  )}
                </span>
              </p>
            </li>
          ))}
        </ul></>
      )}
    </div>
  );
}
  