import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TrainerDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "trainer") navigate("/"); // redirect if not trainer
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl w-full">
        {/* Header */}
        <h1 className="text-3xl font-bold text-indigo-600 mb-2">
          🧑‍🏫 Trainer Dashboard
        </h1>
        <p className="text-gray-600 mb-8">
          Welcome, <span className="font-semibold text-gray-800">Trainer</span>!
          Manage your sessions, track trainees, and oversee tasks here.
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-indigo-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-indigo-700 mb-2">
              📅 Manage Sessions
            </h2>
            <p className="text-gray-600 text-sm">
              Schedule and organize training sessions for your trainees.
            </p>
          </div>

          <div className="p-6 bg-blue-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-blue-700 mb-2">
              👥 Trainee Progress
            </h2>
            <p className="text-gray-600 text-sm">
              Monitor trainee performance and provide feedback.
            </p>
          </div>

          <div className="p-6 bg-green-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-green-700 mb-2">
              📝 Assignments
            </h2>
            <p className="text-gray-600 text-sm">
              Create, review, and evaluate trainee assignments.
            </p>
          </div>

          <div className="p-6 bg-yellow-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-yellow-700 mb-2">
              📊 Reports
            </h2>
            <p className="text-gray-600 text-sm">
              Generate training reports and analyze progress.
            </p>
          </div>

          <div className="p-6 bg-purple-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-purple-700 mb-2">
              💬 Communication
            </h2>
            <p className="text-gray-600 text-sm">
              Chat with trainees and share resources effectively.
            </p>
          </div>

          <div className="p-6 bg-red-50 rounded-xl shadow hover:shadow-md transition">
            <h2 className="text-lg font-semibold text-red-700 mb-2">
              ⚙️ Settings
            </h2>
            <p className="text-gray-600 text-sm">
              Manage your profile and system preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerDashboard;
