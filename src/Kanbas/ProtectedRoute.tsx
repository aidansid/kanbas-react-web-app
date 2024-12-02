import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as courseClient from "./Courses/client";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children, cid }: { children: any; cid: string }) { 
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  if (currentUser) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
}}
function dispatch(arg0: void) {
  throw new Error("Function not implemented.");
}

