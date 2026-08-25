import { useState } from 'react';

export function StaffDashboard() {
  const [phoneSearch, setPhoneSearch] = useState('');
  const [isReturning, setIsReturning] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });

  // Form State
  const [formData, setFormData] = useState({
    fullName: '', age: '', gender: 'MALE', phone: '', address: '', 
    chiefComplaint: '', duration: '', branch: 'SITAPUR'
  });

  const handleLookup = async () => {
    setMessage({ text: 'Searching...', type: 'info' });
    try {
      const res = await fetch(`http://localhost:5000/api/patients/lookup?phone=${phoneSearch}`);
      if (res.ok) {
        const patient = await res.json();
        setIsReturning(true);
        setPatientId(patient.id);
        setFormData({ ...formData, fullName: patient.fullName, age: patient.age, gender: patient.gender, phone: patient.phone });
        setMessage({ text: 'Patient found! Enter today\'s complaint.', type: 'success' });
      } else {
        setIsReturning(false);
        setFormData({ ...formData, phone: phoneSearch, fullName: '', age: '' });
        setMessage({ text: 'New Patient. Please fill all details.', type: 'warning' });
      }
    } catch (error) {
      setMessage({ text: 'Server connection error.', type: 'error' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isReturning ? '/api/appointments/returning' : '/api/patients/new';
    
    // If returning, we only send the Visit details. If new, we send everything.
    const payload = isReturning 
      ? { patientId, chiefComplaint: formData.chiefComplaint, duration: formData.duration, branch: formData.branch }
      : { ...formData, age: Number(formData.age) };

    try {
      const res = await fetch(`http://localhost:5000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setMessage({ text: 'Successfully added to Queue!', type: 'success' });
        // Reset form for the next patient
        setFormData({ fullName: '', age: '', gender: 'MALE', phone: '', address: '', chiefComplaint: '', duration: '', branch: 'SITAPUR' });
        setPhoneSearch('');
        setIsReturning(false);
      } else {
        const errorResponse = await res.json().catch(() => null) as { error?: string } | null;
        setMessage({ text: errorResponse?.error ?? 'Error saving patient data.', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Failed to connect to server.', type: 'error' });
    }
  };

  const logout = () => {
    localStorage.removeItem('staffToken');
    window.location.href = '/staff-login';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-[#1a3b2b] p-6 text-white flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">Reception Desk</h1>
            <p className="text-sm text-[#c59e5e]">Patient Registration & Queueing</p>
          </div>
          <button onClick={logout} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-bold transition-all">
            Logout
          </button>
        </div>

        <div className="p-8">
          {/* Step 1: Lookup Phone */}
          <div className="mb-8 p-6 bg-gray-100 rounded-xl border border-gray-200">
            <label className="block text-sm font-bold text-gray-700 mb-2">1. Search Patient by Phone</label>
            <div className="flex gap-4">
              <input 
                type="text" 
                maxLength={10}
                value={phoneSearch}
                onChange={(e) => setPhoneSearch(e.target.value)}
                placeholder="Enter 10-digit number"
                className="flex-1 px-4 py-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#1a3b2b]"
              />
              <button onClick={handleLookup} className="px-6 py-3 bg-[#c59e5e] text-[#1a3b2b] font-bold rounded-lg hover:bg-[#b08d53]">
                Search / Verify
              </button>
            </div>
            {message.text && (
              <p className={`mt-3 text-sm font-bold ${message.type === 'success' ? 'text-green-600' : message.type === 'warning' ? 'text-orange-500' : 'text-red-500'}`}>
                {message.text}
              </p>
            )}
          </div>

          {/* Step 2: The Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Demographics (Disabled if returning) */}
              <div className="space-y-4 border-r pr-6">
                <h3 className="font-bold text-[#1a3b2b] border-b pb-2">Patient Details</h3>
                <input required disabled={isReturning} type="text" placeholder="Full Name" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} className="w-full p-3 border rounded-lg disabled:bg-gray-100" />
                <div className="flex gap-4">
                  <input required disabled={isReturning} type="number" placeholder="Age" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} className="w-1/3 p-3 border rounded-lg disabled:bg-gray-100" />
                  <select disabled={isReturning} value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-2/3 p-3 border rounded-lg disabled:bg-gray-100">
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>
              </div>

              {/* Today's Visit Info */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1a3b2b] border-b pb-2">Today's Consultation</h3>
                <input required type="text" placeholder="Chief Complaint (e.g., Joint Pain)" value={formData.chiefComplaint} onChange={(e) => setFormData({...formData, chiefComplaint: e.target.value})} className="w-full p-3 border rounded-lg" />
                <input required type="text" placeholder="Duration (e.g., 3 Months)" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full p-3 border rounded-lg" />
                <select value={formData.branch} onChange={(e) => setFormData({...formData, branch: e.target.value})} className="w-full p-3 border rounded-lg">
                  <option value="SITAPUR">Sitapur Branch</option>
                  <option value="LAKHIMPUR">Lakhimpur Branch</option>
                </select>
              </div>

            </div>
            
            <button type="submit" className="w-full bg-[#1a3b2b] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#2a5a44] transition-all shadow-md">
              {isReturning ? 'Add to Doctor\'s Queue' : 'Register & Add to Queue'}
            </button>
          </form>
          
        </div>
      </div>
    </div>
  );
}