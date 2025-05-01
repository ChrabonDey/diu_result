import { useState } from 'react';

export default function App() {
  const [studentId, setStudentId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [studentInfo, setStudentInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = async () => {
    if (!studentId || !semesterId) {
      setError('Please enter both Student ID and Semester ID.');
      return;
    }

    setLoading(true);
    setError('');
    setStudentInfo(null);
    setResult(null);

    try {
     
      const [studentRes, resultRes] = await Promise.all([
        fetch(`http://peoplepulse.diu.edu.bd:8189/result/studentInfo?studentId=${studentId}`),
        fetch(`http://peoplepulse.diu.edu.bd:8189/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`)
      ]);

      // Wait for the responses to be converted to JSON
      const studentData = await studentRes.json();
      const resultData = await resultRes.json();

      // Check for successful responses
      if (!studentRes.ok || !resultRes.ok || !studentData || !resultData) {
        throw new Error('Failed to fetch data.');
      }

      // Set the data to state
      setStudentInfo(studentData);
      setResult({ courses: resultData });

    } catch (err) {
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-white p-8 font-sans">
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">🎓 DIU Student Result Portal</h2>

        <div className="flex flex-col gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter Student ID (e.g. 221-15-5879)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border border-indigo-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            placeholder="Enter Semester ID (e.g. 251)"
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
            className="border border-indigo-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={fetchData}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-200"
          >
            {loading ? 'Fetching...' : 'Show Result'}
          </button>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        {studentInfo && (
          <div className="bg-indigo-50 p-4 rounded-lg shadow-inner mb-6">
            <h3 className="text-lg font-semibold text-indigo-700 mb-2">👤 Student Information</h3>
            <p><strong>Name:</strong> {studentInfo.studentName}</p>
            <p><strong>ID:</strong> {studentInfo.studentId}</p>
            <p><strong>Department:</strong> {studentInfo.departmentName}</p>
            <p><strong>Program:</strong> {studentInfo.programName}</p>
          </div>
        )}

        {result && result.courses?.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg shadow-inner">
            <h3 className="text-lg font-semibold text-green-700 mb-2">📄 Academic Result</h3>
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-collapse">
                <thead>
                  <tr className="bg-green-100">
                    <th className="border p-2">Course Code</th>
                    <th className="border p-2">Course Title</th>
                    <th className="border p-2">Credit</th>
                    <th className="border p-2">Grade Point</th>
                    <th className="border p-2">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {result.courses.map((course, idx) => (
                    <tr key={idx} className="hover:bg-green-50">
                      <td className="border p-2 text-center">{course.customCourseId}</td>
                      <td className="border p-2">{course.courseTitle}</td>
                      <td className="border p-2 text-center">{course.totalCredit}</td>
                      <td className="border p-2 text-center">{course.pointEquivalent}</td>
                      <td className="border p-2 text-center font-bold">{course.gradeLetter}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {result && result.courses?.length === 0 && (
          <p className="text-center text-gray-600 mt-4">No results found for this semester.</p>
        )}
      </div>
    </div>
  );
}
