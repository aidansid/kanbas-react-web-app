import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams, useLocation, useNavigate } from "react-router";
import * as quizClient from "./client";
import { useSelector } from "react-redux";

export default function QuizPreview() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const qid = pathname.split("/")[6];
  const [quiz, setQuiz] = useState<any>();
  const threeSpaces = <>&nbsp;&nbsp;&nbsp;</>;
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState(new Map());
  const [startTime, setStartTime] = useState(new Date().toLocaleTimeString());

  const handleCancel = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const handleSubmit = async () => {
    // create an array of just the answers in order
    const answerArray = Array.from(answers.values());
    const score = getScore(answerArray);
    const a = { time: startTime, user: currentUser._id, answers: answerArray, score: score };
    await quizClient.setQuizAnswers(qid as string, a);
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  const getScore = (answers: any) => {
    let score = 0;
    quiz.questions.forEach((q: any, i: number) => {
      if (q.type === "Multiple Choice" || q.type === "True False") {
        if (q.correctAnswers[0] === answers[i]) {
          score += q.points;
        }
      }
      if (q.type === "Fill in the Blank") {
        if (q.answers.includes(answers[i])) {
          score += q.points;
        }
      }
    });
    return score;
  }

  const handleEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/Edit/${quiz._id}`);
  };

  const fetchQuizzes = async () => {
    const q = await quizClient.fetchQuiz(qid as string);
    setQuiz(q);
    // set the map of answers
    let map = new Map();
    q.questions.forEach((q: any) => {
      map.set(q.title, "");
    });
    setAnswers(map);

  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes-preview">
      {quiz && (
        <div>
          <h2>{quiz.title ?? "Quiz Preview"}</h2>
          {currentUser.role === "FACULTY" && <><span style={{ color: "red" }}>This is a preview of the quiz</span><br /></>}
          <span style={{ color: "gray" }}>Started at {startTime}</span>
          <h4>{quiz.description}</h4>
          <hr />
          {(quiz.oneQuestionAtATime === true) && 
            <div>
              <div style={{ border: '1px solid lightgray', marginLeft: 50, width: 500 }}>
                <div className="d-flex" style={{ backgroundColor: 'lightgray' }}>
                  <h5 style={{ marginTop: 5 }}>&nbsp;{quiz.questions[currentQuestion].title}</h5>
                  <span style={{ marginLeft: 350, marginTop: 5 }}>
                    {quiz.questions[currentQuestion].points} pts
                  </span>
                </div>
                <div style={{ marginLeft: 10, marginTop: 5 }}>
                  {quiz.questions[currentQuestion].question}
                  <br />
                  {quiz.questions[currentQuestion].type === "Multiple Choice" && (
                    <div>
                      {quiz.questions[currentQuestion].answers.map((o: any, i: number) => (
                        <div key={i}>
                          <input type="radio" name={quiz.questions[currentQuestion]._id} value={o} 
                                onChange={(e) => {setAnswers(answers.set(quiz.questions[currentQuestion].title, o))}} />&nbsp;
                          {o}
                        </div>
                      ))}
                    </div>
                  )}
                  {quiz.questions[currentQuestion].type === "True False" && (
                    <div>
                      <input type="radio" name={quiz.questions[currentQuestion]._id} value="True" 
                            onChange={(e) => {setAnswers(answers.set(quiz.questions[currentQuestion].title, "true"))}} />&nbsp;
                      True
                      <br />
                      <input type="radio" name={quiz.questions[currentQuestion]._id} value="False"
                            onChange={(e) => {setAnswers(answers.set(quiz.questions[currentQuestion].title, "false"))}} />&nbsp;
                      False
                    </div>
                  )}
                  {quiz.questions[currentQuestion].type === "Fill in the Blank" && (
                    <div>
                      <input type="text" onChange={(e) => {setAnswers(answers.set(quiz.questions[currentQuestion].title, e.target.value))}} />&nbsp;
                    </div>
                  )}
                  <br />
                </div>
              </div><br />
              {(currentQuestion > 0) && (
                <button className="btn btn-secondary me-2" onClick={() => setCurrentQuestion(currentQuestion - 1)}>Previous</button>
              )}
              {(currentQuestion < (quiz.questions.length - 1)) && (
                <button className="btn btn-secondary me-2" onClick={() => setCurrentQuestion(currentQuestion + 1)}>Next</button>
              )}
            </div>
          }
          {(quiz.oneQuestionAtATime !== true) && 
            <div>
              {quiz.questions.map((q: any, i: number) => (
                <div key={i}>
                  <div style={{ border: '1px solid lightgray', marginLeft: 50, width: 500 }}>
                    <div className="d-flex" key={i} style={{ backgroundColor: 'lightgray' }}>
                      <h5 style={{ marginTop: 5 }}>&nbsp;{q.title}</h5>
                      <span style={{ marginLeft: 350, marginTop: 5 }}>
                        {q.points} pts
                      </span>
                    </div>
                    <div style={{ marginLeft: 10, marginTop: 5 }}>
                      {q.question}
                      <br />
                      {q.type === "Multiple Choice" && (
                        <div>
                          {q.answers.map((o: any, i: number) => (
                            <div key={i}>
                              <input type="radio" name={q._id} value={o} 
                                    onChange={(e) => {setAnswers(answers.set(q.title, o))}} />&nbsp;
                              {o}
                            </div>
                          ))}
                        </div>
                      )}
                      {q.type === "True False" && (
                        <div>
                          <input type="radio" name={q._id} value="True" 
                                onChange={(e) => {setAnswers(answers.set(q.title, "true"))}} />&nbsp;
                          True
                          <br />
                          <input type="radio" name={q._id} value="False"
                                onChange={(e) => {setAnswers(answers.set(q.title, "false"))}} />&nbsp;
                          False
                        </div>
                      )}
                      {q.type === "Fill in the Blank" && (
                        <div>
                          <input type="text" onChange={(e) => {setAnswers(answers.set(q.title, e.target.value))}} />&nbsp;
                        </div>
                      )}
                    </div>
                  </div><br />
                </div>
              ))}
            </div>
          }
          <hr />
          <div className="d-flex justify-content-center">
            {currentUser.role === "FACULTY" && <><button className="btn btn-danger" onClick={() => handleCancel()}>Cancel</button>&nbsp;&nbsp;</>}
            <button className="btn btn-success" onClick={() => handleSubmit()}>Submit</button>&nbsp;&nbsp;
            {currentUser.role === "FACULTY" && <button className="btn btn-secondary" onClick={() => handleEdit()}>Edit Quiz</button>}
          </div>
        </div>
      )}
    </div>
  );
}