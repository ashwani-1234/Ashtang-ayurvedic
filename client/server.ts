import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { z } from 'zod';

const app = express();
const databaseUrl = process.env.DIRECT_DATABASE_URL;

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not configured.');
}

const adapter = new PrismaPg({ connectionString: databaseUrl });
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

// Zod Validation Schema
const newPatientSchema = z.object({
  fullName: z.string().min(3),
  phone: z.string().regex(/^[6-9]\d{9}$/),
  age: z.number().int().min(1),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
  address: z.string().optional(),
  chiefComplaint: z.string().min(3),
  duration: z.string().min(1),
  branch: z.enum(['SITAPUR', 'LAKHIMPUR']).default('SITAPUR')
});

// 1. Register a NEW Walk-In Patient
app.post('/api/patients/new', async (req, res) => {
  try {
    const data = newPatientSchema.parse(req.body);
    
    const newPatient = await prisma.patient.create({
      data: {
        fullName: data.fullName,
        phone: data.phone,
        age: data.age,
        gender: data.gender,
        address: data.address,
        appointments: {
          create: {
            chiefComplaint: data.chiefComplaint,
            duration: data.duration,
            branch: data.branch,
            status: 'WAITING'
          }
        }
      },
      include: { appointments: true }
    });
    res.status(201).json(newPatient);
  } catch (error) {
    console.error('Failed to register patient:', error);

    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: 'Invalid patient data.', details: error.issues });
    }

    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      return res.status(409).json({ error: 'A patient with this phone number already exists.' });
    }

    return res.status(500).json({ error: 'Unable to save patient data.' });
  }
});

// 2. Lookup Existing Patient by Phone
app.get('/api/patients/lookup', async (req, res) => {
  try {
    const { phone } = req.query;
    if (typeof phone !== 'string') return res.status(400).json({ error: 'Phone required' });

    const patient = await prisma.patient.findUnique({ where: { phone } });
    if (!patient) return res.status(404).json({ message: 'Patient not found.' });

    return res.status(200).json(patient);
  } catch (error) {
    console.error('Failed to look up patient:', error);
    return res.status(500).json({ error: 'Unable to look up patient.' });
  }
});

// 3. Add Returning Patient to Queue
app.post('/api/appointments/returning', async (req, res) => {
  try {
    const { patientId, chiefComplaint, duration, branch } = req.body;
    if (!patientId || !chiefComplaint || !duration) return res.status(400).json({ error: 'Missing fields' });

    const newVisit = await prisma.appointment.create({
      data: { patientId, chiefComplaint, duration, branch, status: 'WAITING' }
    });
    return res.status(201).json(newVisit);
  } catch (error) {
    console.error('Failed to add returning patient:', error);
    return res.status(500).json({ error: 'Unable to add appointment.' });
  }
});

app.listen(5000, () => console.log('Clinic Server running on port 5000'));