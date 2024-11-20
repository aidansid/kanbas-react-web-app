import { FaPlus } from "react-icons/fa6";
import { useParams, useLocation } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function QuizControls() {
  const { cid } = useParams();

  return (
    <div id="wd-quiz-controls" className="text-nowrap">
      <button className="btn btn-lg btn-secondary me-1 float-end" id="wd-context-menu-btn" >
        <BsThreeDotsVertical className="position-relative me-2" style={{ bottom: "1px" }} />
      </button>
      <a href={`#/Kanbas/Courses/${cid}/quizzes/${new Date().getTime().toString()}`}>
        <button className="btn btn-lg btn-danger me-1 float-end" id="wd-add-quiz-btn" >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </button>
      </a>
      <div className="d-flex align-items-left md-3">     
          <input type="text" className="icon" placeholder="Search..."/>
      </div>
    </div>
  );
} 