import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TraineeDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "trainee") navigate("/"); // redirect if not trainee
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">
          🎓 Trainee Dashboard
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome, <span className="font-semibold text-gray-800">Trainee</span>!
          Here you can view your schedule, submit tasks, and track your progress.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              📅 My Schedule
            </h2>
            <p className="text-gray-600 text-sm">
              View and track your upcoming training sessions.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              📝 Assignments
            </h2>
            <p className="text-gray-600 text-sm">
              Submit tasks and view assignment deadlines.
            </p>
          </div>

          <div className="p-6 bg-purple-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">
              📊 Progress
            </h2>
            <p className="text-gray-600 text-sm">
              Track your learning and performance reports.
            </p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">
              💬 Messages
            </h2>
            <p className="text-gray-600 text-sm">
              Stay connected with trainers and teammates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TraineeDashboard;
