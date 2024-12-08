import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams, useLocation, useNavigate } from "react-router";
import * as quizClient from "./client";
import { useSelector } from "react-redux";
import { IoMdCheckmark } from "react-icons/io";
import { HiXMark } from "react-icons/hi2";

export default function QuizGrades() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const qid = pathname.split("/")[5];

  const [quiz, setQuiz] = useState<any>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState([]);

  const fetchQuizzes = async () => {
    const q = await quizClient.fetchQuiz(qid as string);
    setQuiz(q);
    // set the array of the user answers
    const attempts = q.attempts.filter((a: any) => a.user === currentUser._id);
    setAnswers(attempts[0].answers);

  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes-grade">
      {quiz && (
        <div>
          <h2>{quiz.title ?? "Quiz Grades"}</h2>
          Score: {quiz.attempts.filter((a: any) => a.user === currentUser._id)[0].score} / {quiz.points}<hr />
          {quiz.questions.map((q: any, i: number) => (
            <><br />
            <div key={i} style={{ border: '1px solid lightgray', padding: 5, width: 500, borderRadius: '5px' }}>
              <h4>{q.title}</h4>
              <div className="wd-answers" key={i}>
                {quiz.questions[i].type === "Multiple Choice" && (
                  <div>
                    {quiz.questions[i].correctAnswers[0] === answers[i] && <IoMdCheckmark style={{ color: 'green' }}/>}
                    {quiz.questions[i].correctAnswers[0] !== answers[i] && <HiXMark style={{ color: 'red' }}/>}
                    {quiz.questions[i].answers.map((o: any, j: number) => (
                      <div key={j}>
                        <input type="radio" name={quiz.questions[i]._id} value={o} checked={answers[i] === o} />&nbsp;
                        {o}
                      </div>
                    ))}
                  </div>
                )}
                {quiz.questions[i].type === "True False" && (
                  <div>
                    {quiz.questions[i].correctAnswers[0] === answers[i] && <IoMdCheckmark style={{ color: 'green' }}/>}
                    {quiz.questions[i].correctAnswers[0] !== answers[i] && <HiXMark style={{ color: 'red' }}/>}<br />
                    <input type="radio" name={quiz.questions[i]._id} value="True" checked={answers[i] === "true"} />&nbsp;
                    True
                    <br />
                    <input type="radio" name={quiz.questions[i]._id} value="False" checked={answers[i] === "false"} />&nbsp;
                    False
                  </div>
                )}
                {quiz.questions[i].type === "Fill in the Blank" && (
                  <div>
                    {quiz.questions[i].answers.includes(answers[i]) && <IoMdCheckmark style={{ color: 'green' }}/>}
                    {!quiz.questions[i].answers.includes(answers[i]) && <HiXMark style={{ color: 'red' }}/>}<br />
                    <input type="text" value={answers[i]} />&nbsp;
                  </div>
                )}
              </div>
            </div></>
          ))}
        </div>
      )}
    </div>
  );
}