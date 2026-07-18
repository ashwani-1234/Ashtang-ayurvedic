import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, Users, CheckCircle, Clock, XCircle, Search, 
  Filter, RefreshCw, ArrowLeft, AlertCircle, Loader2, ShieldAlert
} from 'lucide-react';

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  email?: string;
  notes?: string;
  status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  appointmentDate: string;
  createdAt: string;
  doctor: { name: string };
  service: { name: string; durationMinutes: number };
}

export const AdminDashboard: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Filter & Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [serviceFilter, setServiceFilter] = useState<string>('ALL');

  const fetchAppointments = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/appointments');
      if (!res.ok) throw new Error('Failed to fetch patient appointments.');
      const data = await res.json();
      setAppointments(data);
    } catch (err: any) {
      setError(err.message || 'Could not connect to clinic server on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!res.ok) throw new Error('Failed to update status.');
      
      // Update local state smoothly without a full page reload
      setAppointments((prev) =>
        prev.map((app) => (app.id === id ? { ...app, status: newStatus as any } : app))
      );
    } catch (err) {
      alert('Error updating status. Please try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  // Filter logic
  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch = app.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          app.phone.includes(searchQuery);
    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesService = serviceFilter === 'ALL' || app.service.name === serviceFilter;
    return matchesSearch && matchesStatus && matchesService;
  });

  // KPI Metrics Calculation
  const totalCount = appointments.length;
  const confirmedCount = appointments.filter((a) => a.status === 'CONFIRMED').length;
  const completedCount = appointments.filter((a) => a.status === 'COMPLETED').length;
  const cancelledCount = appointments.filter((a) => a.status === 'CANCELLED').length;

  // Extract unique treatment names for dynamic filter dropdown
  const uniqueServices = Array.from(new Set(appointments.map((a) => a.service.name)));

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent-gold mb-1">
              <ShieldAlert size={16} />
              <span>Staff Administration Portal</span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary-green">
              Doctor Command Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchAppointments}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:bg-gray-50 transition shadow-xs cursor-pointer"
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              <span>Refresh Data</span>
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-primary-green text-accent-gold px-4 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>Exit Admin</span>
            </Link>
          </div>
        </div>

        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Total Bookings</span>
              <Users size={18} className="text-primary-green" />
            </div>
            <div className="font-serif text-3xl font-bold text-primary-green">{totalCount}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs border-l-4 border-l-blue-500">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Confirmed / Pending</span>
              <Clock size={18} className="text-blue-500" />
            </div>
            <div className="font-serif text-3xl font-bold text-blue-600">{confirmedCount}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs border-l-4 border-l-green-500">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Completed Sessions</span>
              <CheckCircle size={18} className="text-green-500" />
            </div>
            <div className="font-serif text-3xl font-bold text-green-600">{completedCount}</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-xs border-l-4 border-l-red-400">
            <div className="flex items-center justify-between text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">
              <span>Cancelled</span>
              <XCircle size={18} className="text-red-400" />
            </div>
            <div className="font-serif text-3xl font-bold text-red-500">{cancelledCount}</div>
          </div>
        </div>

        {/* Controls Bar: Search and Filters */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" size={18} />
            <input
              type="text"
              placeholder="Search by patient name or phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm"
            />
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Filter size={16} className="text-gray-400 shrink-0" />
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold uppercase tracking-wider text-gray-700 outline-none focus:ring-2 focus:ring-primary-green"
              >
                <option value="ALL">All Treatments</option>
                {uniqueServices.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full md:w-auto px-3 py-2 rounded-lg border border-gray-300 bg-white text-xs font-semibold uppercase tracking-wider text-gray-700 outline-none focus:ring-2 focus:ring-primary-green"
            >
              <option value="ALL">All Statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-center gap-3 text-red-700 text-sm">
            <AlertCircle size={20} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Appointments Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          {loading ? (
            <div className="py-20 text-center flex flex-col items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary-green animate-spin mb-3" />
              <p className="text-sm font-medium text-gray-500">Retrieving patient appointments...</p>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-16 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="font-serif text-lg font-bold text-gray-700">No Appointments Found</h3>
              <p className="text-xs text-gray-400 mt-1">Try adjusting your search queries or filter settings.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-[0.7rem] font-bold uppercase tracking-wider text-gray-500">
                    <th className="py-3.5 px-4">Patient Details</th>
                    <th className="py-3.5 px-4">Procedure & Doctor</th>
                    <th className="py-3.5 px-4">Scheduled Date</th>
                    <th className="py-3.5 px-4">Notes</th>
                    <th className="py-3.5 px-4">Status & Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50/80 transition">
                      
                      {/* Patient Details */}
                      <td className="py-4 px-4">
                        <div className="font-bold text-primary-green">{app.patientName}</div>
                        <a href={`tel:${app.phone}`} className="text-xs text-blue-600 hover:underline block font-mono mt-0.5">
                          {app.phone}
                        </a>
                        {app.email && <span className="text-[0.7rem] text-gray-400 block truncate max-w-[180px]">{app.email}</span>}
                      </td>

                      {/* Procedure */}
                      <td className="py-4 px-4">
                        <span className="inline-block bg-accent-gold/15 text-primary-green px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider mb-1">
                          {app.service.name}
                        </span>
                        <div className="text-xs text-gray-500">Dr. {app.doctor.name.replace('Dr. ', '')}</div>
                      </td>

                      {/* Scheduled Date */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="font-semibold text-gray-800">
                          {new Date(app.appointmentDate).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className="text-xs text-gray-500 font-mono">
                          {new Date(app.appointmentDate).toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </div>
                      </td>

                      {/* Notes */}
                      <td className="py-4 px-4">
                        <p className="text-xs text-gray-600 line-clamp-2 max-w-[220px] italic">
                          {app.notes ? `"${app.notes}"` : '—'}
                        </p>
                      </td>

                      {/* Status Management Dropdown */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {updatingId === app.id && (
                            <Loader2 className="w-4 h-4 animate-spin text-accent-gold shrink-0" />
                          )}
                          <select
                            disabled={updatingId === app.id}
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider outline-none border cursor-pointer transition ${
                              app.status === 'CONFIRMED'
                                ? 'bg-blue-50 text-blue-700 border-blue-200 focus:ring-2 focus:ring-blue-500'
                                : app.status === 'COMPLETED'
                                ? 'bg-green-50 text-green-700 border-green-200 focus:ring-2 focus:ring-green-500'
                                : 'bg-red-50 text-red-700 border-red-200 focus:ring-2 focus:ring-red-500'
                            }`}
                          >
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};