import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserGraduate, FaIdCard, FaCalendarAlt, FaBook } from "react-icons/fa";

export default function ResultPage() {
  const location = useLocation();
  const { studentInfo, result } = location.state || {};
  const [showModal, setShowModal] = useState(false);
  const [gifUrl, setGifUrl] = useState("");

  if (!studentInfo || !Array.isArray(result)) {
    return (
      <p className="text-center mt-10 text-red-600 font-semibold">
        No data found. Please try again.
      </p>
    );
  }

  const first = result[0].cgpa;
  const totalCourses = result.length;
  const totalCredits = result.reduce((sum, course) => sum + course.totalCredit, 0);

  useEffect(() => {
    let url = "";

    if (first >= 3.0 && first < 3.5) {
      url = "https://media1.tenor.com/m/JIKo7oLJ8U8AAAAC/dipjol-bangla-cinema.gif";
    } else if (first >= 3.5 && first < 3.8) {
      url = "https://media1.tenor.com/m/jNgE-R_i71wAAAAC/dipjol-gifgari-villain.gif";
    } else if (first >= 3.8) {
      url = "https://media1.tenor.com/m/a-Uc2ot8FNAAAAAd/dipjol.gif";
    }

    if (url) {
      setGifUrl(url);
      setShowModal(true);
      const timer = setTimeout(() => setShowModal(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [first]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-6 flex flex-col items-center">

      {/* 🎉 Conditional Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg max-w-xs">
            <img src={gifUrl} alt="Congratulatory GIF" className="rounded-lg w-full h-auto" />
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-md grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 mb-6">
        <div className="text-center md:col-span-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100">Academic Transcript</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1 sm:mt-2">Daffodil International University</p>
        </div>
        <div className="col-span-2 flex flex-col sm:flex-row justify-around items-center gap-4">
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 text-center w-full sm:w-auto">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Course Taken</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{totalCourses}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 text-center w-full sm:w-auto">
            <p className="text-gray-500 dark:text-gray-300 text-sm">SGPA</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">{first}</p>
          </div>
          <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-4 text-center w-full sm:w-auto">
            <p className="text-gray-500 dark:text-gray-300 text-sm">Total Credits</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{totalCredits}</p>
          </div>
        </div>
      </div>

      {/* Student Info */}
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-md grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 p-4 sm:p-6 mb-6">
        <div>
          <p className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FaUserGraduate /> Student Name:
          </p>
          <p className="ml-6 text-base dark:text-gray-300">{studentInfo.studentName}</p>
        </div>
        <div>
          <p className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FaIdCard /> Student ID:
          </p>
          <p className="ml-6 text-base dark:text-gray-300">{studentInfo.studentId}</p>
        </div>
        <div>
          <p className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FaBook /> Department:
          </p>
          <p className="ml-6 text-base dark:text-gray-300">{studentInfo.departmentName}</p>
        </div>
        <div>
          <p className="font-bold text-gray-700 dark:text-gray-200 flex items-center gap-2">
            <FaCalendarAlt /> Program:
          </p>
          <p className="ml-6 text-base dark:text-gray-300">{studentInfo.programName}</p>
        </div>
      </div>

      {/* Result Table */}
      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Academic Result</h3>
        <table className="w-full min-w-[600px] table-auto border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-indigo-600 dark:bg-blue-200  text-white dark:text-black text-sm sm:text-base">
              <th className="p-3 rounded-l-lg">Course Code</th>
              <th className="p-3">Course Title</th>
              <th className="p-3">Credits</th>
              <th className="p-3">Grade</th>
              <th className="p-3 rounded-r-lg">Point</th>
            </tr>
          </thead>
          <tbody>
            {result.map((course, idx) => (
              <tr key={idx} className="bg-indigo-50 dark:bg-indigo-50 dark:text-black hover:bg-indigo-100 dark:hover:bg-indigo-600 transition duration-200 text-sm sm:text-base">
                <td className="p-3 font-medium">{course.customCourseId}</td>
                <td className="p-3">{course.courseTitle}</td>
                <td className="p-3">{course.totalCredit}</td>
                <td className="p-3">
                  {course.gradeLetter}{" "}
                  {course.gradeLetter === "A+" && "🔥"}
                  {course.gradeLetter === "A-" && "😊"}
                  {course.gradeLetter === "B+" && "💧"}
                </td>
                <td className="p-3">{course.pointEquivalent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
