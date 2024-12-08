import { FaCheckCircle, FaCircle } from "react-icons/fa";
export default function GreenCheckmark() {
  return (
    <span className="me-1 position-relative">
      <FaCheckCircle style={{ top: "2px" }}
        className="text-success me-1 position-absolute fs-4" />
      <FaCircle className="text-white me-1 fs-5" />
    </span>
);}
