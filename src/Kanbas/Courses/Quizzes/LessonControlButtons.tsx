import { IoEllipsisVertical } from "react-icons/io5";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { useState } from "react";
import * as quizClient from "./client";
import { deleteQuiz, updateQuiz } from "./reducer";
import { useDispatch, useSelector } from "react-redux";
import { RiProhibitedLine } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";

export default function LessonControlButtons({ q }: { q: any }) {
  const { cid } = useParams();
  const [contextMenu, setContextMenu] = useState(false);
  const [publish, setPublish] = useState(q.published);
  const [quiz, setQuiz] = useState(q);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const routeChange = () => {
    navigate(`/Kanbas/Courses/${cid}/Quizzes/Edit/${quiz._id}`);
  };
  const removeQuiz = async () => {
    await quizClient.deleteQuiz(quiz._id);
    dispatch(deleteQuiz(quiz._id));
  };
  const publishQuiz = async () => {
    await quizClient.updateQuiz({ ...quiz, published: !publish });
    //dispatch(updateQuiz({ ...quiz, published: !publish }));
    setPublish(!publish);
    setQuiz({ ...quiz, published: !publish });
  };

  return (
    <div className="float-end">
      {contextMenu && currentUser.role === "FACULTY" && (
        <div className="wd-context-menu">
          {publish && <IoIosCheckmarkCircle className="text-success fs-3" onClick={() => publishQuiz()}/>}
          {!publish && <RiProhibitedLine className="text-danger fs-3" onClick={() => publishQuiz()}/>}
          <IoEllipsisVertical className="fs-2" onClick={() => setContextMenu(!contextMenu)} />
          <ul className="list-group">
            <button className="list-group-item" onClick={() => routeChange()}>Edit</button>
            <button className="list-group-item" onClick={() => removeQuiz()}>Delete</button>
            <button className="list-group-item" onClick={() => publishQuiz()}>
              {publish ? "Unpublish" : "Publish"}
            </button>
          </ul>
        </div>
      )}
      {!contextMenu && currentUser.role === "FACULTY" && (
        <div className="wd-context-menu">
          {publish && <IoIosCheckmarkCircle className="text-success fs-3" onClick={() => publishQuiz()} />}
          {!publish && <RiProhibitedLine className="text-danger fs-3" onClick={() => publishQuiz()}/>}
          <IoEllipsisVertical className="fs-2" onClick={() => setContextMenu(!contextMenu)} />
        </div>
      )}
    </div>
);}