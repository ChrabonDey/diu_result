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
        `https://siblyserver-ks5afztv5-chrabon-deys-projects.vercel.app//api/result?studentId=${studentId}&semesterId=${semesterId}`
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
          result: data.result // ✅ FIXED
        }
      });
    } catch (err) {
      console.error('❌ Client error:', err.message);
      setError(err.message || 'An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
          🎓 গরীবেরা রেজাল্ট দেখ
        </h2>

        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Student ID (e.g. 221-15-1234)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            className="border border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <input
            type="text"
            placeholder="Enter Semester ID (e.g. 251)"
            value={semesterId}
            onChange={(e) => setSemesterId(e.target.value)}
            className="border border-indigo-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
          <button
            onClick={fetchData}
            disabled={loading}
            className={`py-3 rounded-xl font-semibold text-white transition duration-300 ${
              loading ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {loading ? <div class="relative flex justify-center items-center">
    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
     <img src={img1} alt="" className="rounded-full h-16 w-16 object-contain" />
</div> : '🔍 Show Result'}
          </button>
          {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}
