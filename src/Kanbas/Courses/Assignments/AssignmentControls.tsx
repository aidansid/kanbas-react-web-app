import { FaPlus } from "react-icons/fa6";

export default function AssignmentControls() {
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <button id="wd-add-module-btn" className="btn btn-lg btn-danger me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Assignment</button>
        <button id="wd-add-module-btn" className="btn btn-lg btn-secondary me-1 float-end">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Group</button>
        <div className="d-flex align-items-left md-3">     
            <input type="text" className="icon" placeholder="Search..."/>
        </div>
    </div>
);}