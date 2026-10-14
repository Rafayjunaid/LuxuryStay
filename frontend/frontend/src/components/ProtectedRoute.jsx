import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {
  const storedUser = localStorage.getItem("user");

  if (!storedUser) {
    return <Navigate to="/login" replace />;
  }

  let user;

  try {
    user = JSON.parse(storedUser);
  } catch (error) {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  if (!user || !user.role) {
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;