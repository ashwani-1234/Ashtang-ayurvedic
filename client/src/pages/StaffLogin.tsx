import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function StaffLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // HARDCODED FOR NOW to test the UI. 
    // Next step: We will move this to your secure MySQL database!
    if (password === 'Ashtang@2024') {
      localStorage.setItem('staffToken', 'authenticated');
      navigate('/staff/dashboard');
    } else {
      setError('Invalid clinic password');
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfcf9] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1a3b2b]">Clinic Staff Portal</h2>
          <p className="text-gray-500 text-sm mt-2">Authorized personnel only</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Staff Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#1a3b2b] outline-none"
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-[#1a3b2b] text-white py-3 rounded-lg font-bold hover:bg-[#2a5a44] transition-all"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}