import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import img1 from '../assets/images.jpeg';

export default function Home() {
  const [studentId, setStudentId] = useState('');
  const [semesterId, setSemesterId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
    if (!studentId || !semesterId) {
      setError('Please enter both Student ID and Semester ID.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(
        `https://diu-result-server-1.onrender.com/api/result?studentId=${studentId}&semesterId=${semesterId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch result. Please check your input.');
      }

      const data = await response.json();

      if (!data.studentInfo || !Array.isArray(data.result)) {
        throw new Error('Invalid data received from server.');
      }

      navigate('/result', {
        state: {
          studentInfo: data.studentInfo,
          result: data.result,
        },
      });
    } catch (err) {
      console.error('❌ Client error:', err.message);
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black flex flex-col items-center justify-center px-4 py-8">
      <button
        onClick={() => {
          const html = document.documentElement;
          const isDark = html.classList.toggle('dark');
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }}
        className="fixed top-4 right-4 bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-xl shadow"
      >
        Toggle Theme
      </button>

      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-indigo-700 dark:text-indigo-200 text-center mb-6">
          🎓 গরীবেরা রেজাল্ট দেখ
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Student ID (e.g. 221-15-1234)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border border-indigo-300 dark:border-indigo-600 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 transition"
          />
          <input
            type="text"
            placeholder="Enter Semester ID (e.g. 251)"
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
            className="border border-indigo-300 dark:border-indigo-600 rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white dark:focus:ring-indigo-400 transition"
          />

          <button
            onClick={fetchData}
            disabled={loading}
            className={`py-3 rounded-xl font-semibold text-white transition duration-300 text-sm sm:text-base ${
              loading
                ? 'bg-indigo-300 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-800 dark:hover:bg-indigo-900'
            }`}
          >
            {loading ? (
              <div className="relative flex justify-center items-center h-16">
                <div className="absolute animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-500"></div>
                <img
                  src={img1}
                  alt="Loading"
                  className="rounded-full h-12 w-12 object-contain"
                />
              </div>
            ) : (
              '🔍 Show Result'
            )}
          </button>

          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </div>
      </div>

      <div className="mt-4 text-gray-400 text-xs sm:text-sm text-center">
        @Chrabondey
      </div>
    </div>
  );
}
