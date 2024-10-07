import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      &nbsp;
      <IoEllipsisVertical className="fs-2" />
    </div>
);}