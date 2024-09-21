import { Routes, Route, Navigate } from "react-router-dom";
import Quiz1 from "./Quiz1";
import Quiz2 from "./Quiz2";
import Quiz3 from "./Quiz3";
import TOC from "./TOC";

export default function Quizzes() {
    return (
        <div id="wd-quizzes">
        <h2>Quizzes</h2>
        <button id="wd-quiz-add-button" type="button">Add+</button>
        <TOC />
        <Routes>
            <Route path="Quiz1" element={<Quiz1 />} />
            <Route path="Quiz2" element={<Quiz2 />} />
            <Route path="Quiz3" element={<Quiz3 />} />
        </Routes>
      </div>
    );
  }
  