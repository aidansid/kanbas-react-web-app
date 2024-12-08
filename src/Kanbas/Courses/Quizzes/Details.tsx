import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams, useLocation, useNavigate } from "react-router";
import { BsPencil } from "react-icons/bs";
import * as quizClient from "./client";

export default function QuizDetails() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const qid = pathname.split("/")[6];
  const [quiz, setQuiz] = useState<any>();
  const threeSpaces = <>&nbsp;&nbsp;&nbsp;</>;

  const routeChangeEdit = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/Edit/${quiz._id}`);
  };

  const routeChangePreview = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/Preview/${quiz._id}`);
  };

  const fetchQuizzes = async () => {
    const q = await quizClient.fetchQuiz(qid as string);
    setQuiz(q);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div id="wd-quizzes-detail">
      {quiz && (
      <><div className="d-flex justify-content-center">
          <button className="btn btn-secondary" onClick={() => routeChangePreview()}>Preview</button>&nbsp;
          <button className="btn btn-secondary" onClick={() => routeChangeEdit()}><BsPencil style={{ transform: 'scaleX(-1)' }}/> Edit</button>
        </div><hr /><h2>{quiz.title ?? "Quiz Details"}</h2><br />
        <div className="d-flex">
            <div style={{ display: "flex", flexDirection: "column", marginLeft: "200px", textAlign: "right" }}>
              <div>
                <b>Quiz Type</b>
                <br />
                <b>Points</b>
                <br />
                <b>Assignment Group</b>
                <br />
                <b>Shuffle Answers</b>
                <br />
                <b>Time Limit</b>
                <br />
                <b>Multiple Attempts</b>
                {quiz.multipleAttempts && <><br /><b>How Many Attempts</b></>}
                <br />
                <b>View Responses</b>
                <br />
                <b>Show Correct Answers</b>
                <br />
                <b>One Questions at a Time</b>
                <br />
                <b>Webcam Required</b>
                <br />
                <b>Lock Questions After Answering</b>
                <br />
                <b>Access Code</b>
              </div>
            </div>
            {threeSpaces}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                {quiz.quizType}
                <br />
                {quiz.points}
                <br />
                {quiz.assignmentGroup}
                <br />
                {quiz.shuffleAnswers ? "Yes" : "No"}
                <br />
                {quiz.timeLimit} Minutes
                <br />
                {quiz.multipleAttempts ? "Yes" : "No"}
                {quiz.multipleAttempts && (
                  <><br />{quiz.howManyAttempts}</>)}
                <br />
                No
                <br />
                {quiz.showCorrectAnswers ? "Yes" : "No"}
                <br />
                {quiz.oneQuestionAtATime ? "Yes" : "No"}
                <br />
                {quiz.webcamRequired ? "Yes" : "No"}
                <br />
                {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}
                <br />
                {quiz.accessCode}
              </div>
            </div>
          </div>
          <br />
          <table className="table">
              <thead>
                <tr><th>Due</th><th>For</th><th>Available from</th><th>Until</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{quiz.dueDate}</td>
                  <td>Everyone</td>
                  <td>{quiz.availableDate}</td>
                  <td>{quiz.untilDate}</td>
                </tr>
              </tbody>
            </table>
          </>
      )}
    </div>
  );
}