import { FaPlus } from "react-icons/fa6";
import AssignmentEditor from './Editor';
import { useParams, useLocation } from "react-router";

export default function AssignmentControls() {
  const { cid } = useParams();

  return (
    <div id="wd-assignments-controls" className="text-nowrap">
      <a href={`#/Kanbas/Courses/${cid}/Assignments/${new Date().getTime().toString()}`}>
        <button className="btn btn-lg btn-danger me-1 float-end" id="wd-add-assignment-btn" >
          <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
          Assignment
        </button>
      </a>
      <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group
      </button>
      <div className="d-flex align-items-left md-3">     
          <input type="text" className="icon" placeholder="Search..."/>
      </div>
    </div>
  );
} 