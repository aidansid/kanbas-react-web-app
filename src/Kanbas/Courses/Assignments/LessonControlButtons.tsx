import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";

export default function LessonControlButtons({ assignmentId, deleteAssignment }: {
  assignmentId: string; deleteAssignment: (assignmentId: string) => void }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div className="float-end">
      {currentUser.role === "FACULTY" && (
        <FaTrash className="text-danger me-2 mb-1" onClick={() => deleteAssignment(assignmentId)}/>
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-2" />
    </div>
);}