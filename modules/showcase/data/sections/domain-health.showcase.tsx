'use client';
import { PatientSummaryCard } from '@/modules/domain/health/PatientSummaryCard';
import { AppointmentCalendar } from '@/modules/domain/health/AppointmentCalendar';
import { PrescriptionEditor } from '@/modules/domain/health/PrescriptionEditor';
import { VitalSignsChartPanel } from '@/modules/domain/health/VitalSignsChartPanel';
import { LabResultTable } from '@/modules/domain/health/LabResultTable';
import type { ShowcaseComponent } from '../showcase.types';

export function buildHealthData(): ShowcaseComponent[] {
  return [
    {
      id: 'hc-patient-card',
      title: 'PatientSummaryCard',
      category: 'Domain' as const,
      abbr: 'Ps',
      description: 'Patient identity card with status badge, allergies, blood type, and alert banners.',
      filePath: 'modules/domain/health/PatientSummaryCard.tsx',
      sourceCode: `import { PatientSummaryCard } from '@/modules/domain/health/PatientSummaryCard';\n\n<PatientSummaryCard\n  name="Jane Doe"\n  patientId="P-00421"\n  dob="1985-03-15"\n  bloodType="A+"\n  status="admitted"\n  allergies={['Penicillin','Aspirin']}\n/>`,
      variants: [
        {
          title: 'Critical patient',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <PatientSummaryCard
                name="Jane Doe"
                patientId="P-00421"
                dob="1985-03-15"
                gender="Female"
                bloodType="A+"
                status="admitted"
                ward="Cardiology – 3B"
                primaryDoctor="Dr. Emily Chen"
                allergies={['Penicillin', 'Aspirin']}
                alerts={[{ message: 'NPO since midnight', severity: 'warning' }]}
              />
            </div>
          ),
          code: `<PatientSummaryCard\n  name="Jane Doe"\n  patientId="P-00421"\n  dob="1985-03-15"\n  bloodType="A+"\n  status="admitted"\n  ward="Cardiology – 3B"\n  allergies={['Penicillin']}\n  alerts={[{ message: 'NPO since midnight', severity: 'warning' }]}\n/>`,
        },
      ],
    },

    {
      id: 'hc-appointment',
      title: 'AppointmentCalendar',
      category: 'Domain' as const,
      abbr: 'Ap',
      description: 'Upcoming appointments list with book-new modal containing DatePicker and TimePicker.',
      filePath: 'modules/domain/health/AppointmentCalendar.tsx',
      sourceCode: `import { AppointmentCalendar } from '@/modules/domain/health/AppointmentCalendar';\n\n<AppointmentCalendar\n  appointments={appointments}\n  onBook={async (date, time) => { /* book appointment */ }}\n/>`,
      variants: [
        {
          title: 'Appointment calendar',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-md">
              <AppointmentCalendar
                appointments={[
                  { id: '1', date: '2026-04-25', time: '10:00', doctor: 'Dr. Emily Chen', type: 'Cardiology follow-up', location: 'Room 302' },
                  { id: '2', date: '2026-05-02', time: '14:30', doctor: 'Dr. James Park', type: 'Blood work review' },
                ]}
              />
            </div>
          ),
          code: `<AppointmentCalendar\n  appointments={[\n    { id: '1', date: '2026-04-25', time: '10:00', doctor: 'Dr. Chen', type: 'Cardiology follow-up' },\n  ]}\n  onBook={async (date, time) => {\n    await bookAppointment({ date, time });\n  }}\n/>`,
        },
      ],
    },

    {
      id: 'hc-prescription',
      title: 'PrescriptionEditor',
      category: 'Domain' as const,
      abbr: 'Pe',
      description: 'Drug prescription form with dosage, frequency, administration routes multi-select, and warnings tag input.',
      filePath: 'modules/domain/health/PrescriptionEditor.tsx',
      sourceCode: `import { PrescriptionEditor } from '@/modules/domain/health/PrescriptionEditor';\n\n<PrescriptionEditor\n  initial={{ drug: 'Amoxicillin 500mg', dosage: '500mg', frequency: '3× daily' }}\n  onSave={(rx) => savePrescription(rx)}\n  onCancel={() => setOpen(false)}\n/>`,
      variants: [
        {
          title: 'Prescription editor',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <PrescriptionEditor initial={{ drug: 'Amoxicillin 500mg', dosage: '500mg', frequency: '3× daily', duration: '7 days' }} />
            </div>
          ),
          code: `<PrescriptionEditor\n  initial={{ drug: 'Amoxicillin 500mg', dosage: '500mg', frequency: '3× daily' }}\n  onSave={(rx) => savePrescription(rx)}\n  onCancel={handleCancel}\n/>`,
        },
      ],
    },

    {
      id: 'hc-vitals',
      title: 'VitalSignsChartPanel',
      category: 'Domain' as const,
      abbr: 'Vs',
      description: 'Latest vitals summary cards (HR, SpO₂, temp) with health score bars and full readings history table.',
      filePath: 'modules/domain/health/VitalSignsChartPanel.tsx',
      sourceCode: `import { VitalSignsChartPanel } from '@/modules/domain/health/VitalSignsChartPanel';\n\n<VitalSignsChartPanel readings={readings} />`,
      variants: [
        {
          title: 'Vital signs panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <VitalSignsChartPanel readings={[
                { time: '08:00', hr: 72, bp: '120/80', spo2: 98, temp: 36.6, rr: 16 },
                { time: '12:00', hr: 85, bp: '125/82', spo2: 97, temp: 36.8, rr: 18 },
                { time: '16:00', hr: 110, bp: '135/88', spo2: 93, temp: 37.5, rr: 20 },
              ]} />
            </div>
          ),
          code: `<VitalSignsChartPanel\n  readings={[\n    { time: '08:00', hr: 72, bp: '120/80', spo2: 98, temp: 36.6, rr: 16 },\n    { time: '16:00', hr: 110, bp: '135/88', spo2: 93, temp: 37.5, rr: 20 },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'hc-lab-results',
      title: 'LabResultTable',
      category: 'Domain' as const,
      abbr: 'Lr',
      description: 'Paginated lab results table with reference ranges, abnormal highlighting, and status tooltips.',
      filePath: 'modules/domain/health/LabResultTable.tsx',
      sourceCode: `import { LabResultTable } from '@/modules/domain/health/LabResultTable';\n\n<LabResultTable results={labResults} />`,
      variants: [
        {
          title: 'Lab results table',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <LabResultTable results={[
                { id: '1', test: 'Hemoglobin', category: 'Hematology', value: '13.5', unit: 'g/dL', refRange: '12–17.5', status: 'normal', date: '2026-04-20' },
                { id: '2', test: 'Glucose (fasting)', category: 'Metabolic', value: '118', unit: 'mg/dL', refRange: '70–99', status: 'high', date: '2026-04-20', note: 'Pre-diabetic range' },
                { id: '3', test: 'TSH', category: 'Thyroid', value: '0.4', unit: 'mIU/L', refRange: '0.5–4.5', status: 'low', date: '2026-04-19' },
              ]} />
            </div>
          ),
          code: `<LabResultTable\n  results={[\n    { id: '1', test: 'Hemoglobin', category: 'Hematology', value: '13.5', unit: 'g/dL', refRange: '12–17.5', status: 'normal', date: '2026-04-20' },\n    { id: '2', test: 'Glucose', category: 'Metabolic', value: '118', unit: 'mg/dL', refRange: '70–99', status: 'high', date: '2026-04-20' },\n  ]}\n/>`,
        },
      ],
    },
  ];
}
