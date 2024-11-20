import React, { useEffect, useState } from "react";
import "./index.css";
import { useParams, useLocation } from "react-router";
import * as quizClient from "./client";

export default function QuizEditor() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const qid = pathname.split("/")[5];
  const [quiz, setQuiz] = useState<any>();

  const fetchQuizzes = async () => {
    const q = await quizClient.fetchQuiz(qid);
    setQuiz(q);
  };
  useEffect(() => {
    fetchQuizzes();
  }, []);

  let isNewQuiz = true;
  if (quiz) {
    isNewQuiz = false;
  }

  let newQuiz = {_id: qid};
  if (!isNewQuiz) {
    newQuiz = {_id: qid };
  }

  return (
    <div id="wd-quizzes-editor">
      <h2>Quizzes Editor</h2>
    </div>
  );
}