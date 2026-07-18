import React, { useState, useEffect } from 'react';
import { User, Phone, Mail, Calendar, FileText, CheckCircle2, AlertCircle, Loader2, Stethoscope } from 'lucide-react';

interface Service {
  id: number;
  name: string;
  durationMinutes: number;
}

interface Doctor {
  id: number;
  name: string;
}

export const PatientBookingForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  
  // UI States
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Form Field States
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [notes, setNotes] = useState('');

  // 1. Fetch available doctors and services on component mount
  useEffect(() => {
    fetch('https://ashtang-clinic-api.onrender.com/api/appointments')
      .then((res) => res.json())
      .then((data) => {
        setServices(data.services || []);
        setDoctors(data.doctors || []);
        if (data.services?.length > 0) setServiceId(String(data.services[0].id));
        if (data.doctors?.length > 0) setDoctorId(String(data.doctors[0].id));
      })
      .catch(() => {
        setErrorMessage('Unable to load clinical treatments. Please ensure the backend server is running.');
      })
      .finally(() => setIsLoadingData(false));
  }, []);

  // 2. Client-Side Validation Engine
  const validateForm = (): boolean => {
    setValidationError(null);

    if (patientName.trim().length < 2) {
      setValidationError('Please enter a valid full name.');
      return false;
    }

    // Basic 10-digit phone validation
    const phoneRegex = /^[6-9]\d{9}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setValidationError('Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9.');
      return false;
    }

    if (!appointmentDate) {
      setValidationError('Please select a preferred date and time for your consultation.');
      return false;
    }

    const selectedDate = new Date(appointmentDate);
    const now = new Date();
    if (selectedDate < now) {
      setValidationError('You cannot book an appointment in the past. Please select a future date.');
      return false;
    }

    return true;
  };

  // 3. Handle Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('https://ashtang-clinic-api.onrender.com/api/clinic-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName: patientName.trim(),
          phone: phone.replace(/\D/g, ''),
          email: email.trim(),
          notes: notes.trim(),
          doctorId: Number(doctorId),
          serviceId: Number(serviceId),
          appointmentDate: new Date(appointmentDate).toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit booking request.');
      }

      setSuccessMessage(`Appointment confirmed for ${patientName}! We will contact you shortly on ${phone}.`);
      
      // Reset Form Fields
      setPatientName('');
      setPhone('');
      setEmail('');
      setNotes('');
      setAppointmentDate('');

      if (onSuccess) {
        setTimeout(() => onSuccess(), 3000);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred while communicating with the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate minimum datetime string for HTML input (prevents selecting past dates in UI)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  if (isLoadingData) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl shadow-sm border border-gray-100">
        <Loader2 className="w-8 h-8 text-primary-green animate-spin mb-3" />
        <p className="text-sm font-medium text-gray-600">Loading clinical treatments and availability...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border-t-4 border-accent-gold max-w-xl mx-auto">
      <div className="text-center mb-6">
        <div className="w-12 h-12 bg-accent-gold/15 rounded-full flex items-center justify-center mx-auto mb-3 text-primary-green">
          <Stethoscope size={24} />
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-primary-green">
          Patient Registration & Booking
        </h2>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Fill in your details below to schedule your specialized Ayurvedic treatment.
        </p>
      </div>

      {/* Validation Error Banner */}
      {validationError && (
        <div className="mb-6 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-lg flex items-start gap-3 text-amber-800 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
          <span>{validationError}</span>
        </div>
      )}

      {/* API Error Banner */}
      {errorMessage && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg flex items-start gap-3 text-red-700 text-xs sm:text-sm">
          <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Success Banner */}
      {successMessage ? (
        <div className="p-8 bg-green-50 rounded-xl border border-green-200 text-center space-y-4 animate-fadeIn">
          <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto" />
          <h3 className="font-serif text-xl font-bold text-primary-green">Booking Successful!</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{successMessage}</p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="mt-4 bg-primary-green text-accent-gold px-6 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider hover:brightness-110 transition cursor-pointer"
          >
            Book Another Appointment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Patient Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Patient Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" size={18} />
              <input
                type="text"
                required
                placeholder="e.g., Amit Sharma"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm transition"
              />
            </div>
          </div>

          {/* Phone & Email Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="tel"
                  required
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Email Address <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm transition"
                />
              </div>
            </div>
          </div>

          {/* Treatment & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Select Procedure <span className="text-red-500">*</span>
              </label>
              <select
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm bg-white font-medium text-gray-800 transition"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.durationMinutes} mins)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                Preferred Date & Time <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" size={18} />
                <input
                  type="datetime-local"
                  required
                  min={getMinDateTime()}
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm text-gray-800 transition"
                />
              </div>
            </div>
          </div>

          {/* Doctor Selection */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Consulting Specialist
            </label>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm bg-white font-medium text-gray-800 transition"
            >
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          {/* Clinical Notes / Symptoms */}
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
              Symptoms / Chief Complaints
            </label>
            <div className="relative">
              <FileText className="absolute left-3.5 top-3 text-gray-400 pointer-events-none" size={18} />
              <textarea
                rows={3}
                placeholder="Briefly describe your symptoms (e.g., severe joint pain, sciatica, digestive issues)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm resize-none transition"
              ></textarea>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-accent-gold text-primary-green font-bold py-3.5 rounded-lg uppercase tracking-wider text-sm hover:brightness-105 active:scale-[0.99] transition shadow-md disabled:opacity-60 disabled:pointer-events-none cursor-pointer mt-6 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Booking...</span>
              </>
            ) : (
              <span>Confirm Appointment</span>
            )}
          </button>
        </form>
      )}
    </div>
  );
};