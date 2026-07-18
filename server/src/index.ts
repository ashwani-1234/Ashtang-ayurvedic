import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// ==========================================
// ⚠️ ESSENTIAL MIDDLEWARE (Must be at the top!)
// ==========================================
app.use(cors({ origin: '*' }));
app.use(express.json()); // Allows secure connections from Vercel & local frontendapp.use(express.json());

// ==========================================
// API ENDPOINTS
// ==========================================

// 1. Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', message: 'Ashtang Ayurved API is running cleanly 🚀' });
});

// 2. Get All Doctors & Services (For Frontend Dropdowns)
app.get('/api/clinic-data', async (req: Request, res: Response) => {
  try {
    const doctors = await prisma.doctor.findMany();
    const services = await prisma.service.findMany();
    res.json({ doctors, services });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch clinic data' });
  }
});

// 3. Book an Appointment
app.post('/api/appointments', async (req: Request, res: Response): Promise<any> => {
  try {
    const { patientName, phone, email, notes, doctorId, serviceId, appointmentDate } = req.body;

    // Basic validation
    if (!patientName || !phone || !doctorId || !serviceId) {
      return res.status(400).json({ error: 'Missing required booking fields.' });
    }

    const newAppointment = await prisma.appointment.create({
      data: {
        patientName,
        phone,
        email,
        notes,
        doctorId: Number(doctorId),
        serviceId: Number(serviceId),
        appointmentDate: appointmentDate ? new Date(appointmentDate) : new Date(),
      },
      include: {
        doctor: true,
        service: true,
      },
    });

    console.log(`📅 New Appointment Booked: ${patientName} with ${newAppointment.doctor.name}`);
    res.status(201).json({ success: true, appointment: newAppointment });
  } catch (error) {
    console.error('Booking Error:', error);
    res.status(500).json({ error: 'Internal server error while booking appointment.' });
  }
});

// 4. Get All Appointments (For Admin/Doctor Dashboard)
app.get('/api/appointments', async (req: Request, res: Response) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: { doctor: true, service: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
});
// 5. Update Appointment Status (For Admin Dashboard)
app.patch('/api/appointments/:id', async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const updatedAppointment = await prisma.appointment.update({
      where: { id },
      data: { status },
      include: { doctor: true, service: true },
    });

    console.log(`🔄 Status Updated: Appointment ${id} is now ${status}`);
    res.json({ success: true, appointment: updatedAppointment });
  } catch (error) {
    console.error('Update Error:', error);
    res.status(500).json({ error: 'Failed to update appointment status.' });
  }
});
// ==========================================
// REVIEW ENDPOINTS
// ==========================================

// 6. Get Top 10 Latest Reviews
app.get('/api/reviews', async (req: Request, res: Response) => {
  try {
    const reviews = await prisma.review.findMany({
      take: 10,
      orderBy: { createdAt: 'desc' },
    });
    res.json(reviews);
  } catch (error) {
    console.error('Fetch Reviews Error:', error);
    res.status(500).json({ error: 'Failed to retrieve patient reviews.' });
  }
});

// 7. Submit a New Review
app.post('/api/reviews', async (req: Request, res: Response): Promise<any> => {
  try {
    const { name, text, stars } = req.body;

    if (!name || !text) {
      return res.status(400).json({ error: 'Please provide both your name and review text.' });
    }

    const newReview = await prisma.review.create({
      data: {
        name: name.trim(),
        text: text.trim(),
        stars: Number(stars) || 5,
      },
    });

    console.log(`⭐ New Review Received from ${name} (${stars} Stars)`);
    res.status(201).json({ success: true, review: newReview });
  } catch (error) {
    console.error('Review Submission Error:', error);
    res.status(500).json({ error: 'Internal server error while saving review.' });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`\n🏥 --- ASHTANG AYURVED BACKEND ONLINE --- 🏥`);
  console.log(`🚀 API Server running on: http://localhost:${PORT}`);
  console.log(`🔗 Frontend Allowed Origin: http://localhost:5173\n`);
});