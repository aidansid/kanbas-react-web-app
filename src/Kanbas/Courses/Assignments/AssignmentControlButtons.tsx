import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlusLg } from "react-icons/bs";
import "./index.css";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <span id="box" style={{ fontSize: '20px', color: 'black' }}>
        &nbsp; 40% of Total &nbsp;
      </span> &nbsp;
      <BsPlusLg className="fs-4"/>
      <IoEllipsisVertical className="fs-4" />
    </div>
);}