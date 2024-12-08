import { FaPlus } from "react-icons/fa6";
import { useParams, useLocation } from "react-router";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import * as quizClient from "./client";
import { addQuiz } from "./reducer";

export default function QuizControls() {
  const { cid } = useParams();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const createQuiz = async () => {
    const q = { 
      title: "New Quiz", course: cid, description: "", quizType: "Graded Quiz", published: false,
      points: 0, assignmentGroup: "Quizzes", shuffleAnswers: true, timeLimit: 20, multipleAttemps: false,
      showCorrectAnswers: false, accessCode: "", oneQuestionAtATime: true, webcamRequired: false, 
      lockQuestionsAfterAnswering: false, dueDate: "", availableDate: "", untilDate: "", questions: [],
    };
    const newQuiz = await quizClient.addQuiz(q);
    dispatch(addQuiz(newQuiz));
  };

  return (
    <div id="wd-quiz-controls" className="text-nowrap">
      <button className="btn btn-lg btn-secondary me-1 float-end" id="wd-context-menu-btn">
        <BsThreeDotsVertical className="position-relative me-2" style={{ bottom: "1px" }} />
      </button>
      {currentUser.role === "FACULTY" && (
        <button className="btn btn-lg btn-danger me-1 float-end" id="wd-add-quiz-btn"
                onClick={() => {createQuiz();}}>
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Quiz
        </button>
      )}
      <div className="d-flex align-items-left md-3">     
          <input type="text" className="icon" placeholder="Search..."/>
      </div>
    </div>
  );
} 