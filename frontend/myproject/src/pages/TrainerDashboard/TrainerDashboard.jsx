import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TrainerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "trainer") navigate("/"); // redirect if not trainer
  }, [navigate]);

  return (
    <div>
      <h1>Trainer Dashboard</h1>
      <p>Welcome, Trainer! Here you can manage your tasks, sessions, etc.</p>
    </div>
  );
}

export default TrainerDashboard;
