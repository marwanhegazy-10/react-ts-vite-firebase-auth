import { UseAuth } from "@/context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

const Protected = ({ children }: any) => {
  const { user, loading } = useContext(UseAuth);

  //We return this because we still are not sure if the user is logged in yet
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    console.log("user: ", user);
    return <Navigate to="/sign-in" replace />;
  } else {
    return children;
  }
};

export default Protected;
