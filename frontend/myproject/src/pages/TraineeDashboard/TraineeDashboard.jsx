import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TraineeDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "trainee") navigate("/"); // redirect if not trainee
  }, [navigate]);

  return (
    <div>
      <h1>Trainee Dashboard</h1>
      <p>Welcome, Trainee! Here you can view your schedule, submit tasks, etc.</p>
    </div>
  );
}

export default TraineeDashboard;
