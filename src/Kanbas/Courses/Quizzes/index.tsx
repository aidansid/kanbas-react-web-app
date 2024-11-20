import { Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuizzes } from "./reducer";
import * as quizClient from "./client";
import QuizControls from "./QuizControls";
import LessonControlButtons from "./LessonControlButtons";
import { IoMdArrowDropdown } from "react-icons/io";
import { VscRocket } from "react-icons/vsc";
import { BsGripVertical } from 'react-icons/bs';

export default function Quizzes() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: any) => state.quizReducer);
  const fetchQuizzes = async () => {
    const quizzes = await quizClient.fetchQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes">
      <QuizControls />
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
                <LessonControlButtons />
                <span className="title" >
                  <b><a href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`} style={{ textDecoration: "none", color: "black" }}>{quiz.title}</a></b>
                </span>
                <p className="description">
                  <span> {quiz.points} points | {quiz.questionIds.length} questions </span>
                </p>
              </li>
            ))}
          </ul>
    </div>
  );
}
  