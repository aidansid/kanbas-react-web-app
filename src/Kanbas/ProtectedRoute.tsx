import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { enrollments } from "./Database";

export default function ProtectedRoute1({ children, cid }: { children: any; cid: string }) { 
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  if (currentUser && enrollments.find((enrollment: any) => enrollment.course === cid && enrollment.user === currentUser._id)) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
}}
