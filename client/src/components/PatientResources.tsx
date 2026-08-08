import React from 'react';
import { FileText, Download, Eye } from 'lucide-react';

export const PatientResources: React.FC = () => {
  const resources = [
    {
      title: 'Ayurvedic Diet Chart (सामान्य पथ्य)',
      description:
        'A comprehensive guide on daily meal timings, exact portion sizes, and essential dietary rules for your holistic healing.',
      file: '/pdfs/Ashtang_Ayurved_Clinic_Diet_Chart.pdf',
      filename: 'Ashtang_Ayurved_Clinic_Diet_Chart.pdf',
    },
    {
      title: 'Daily Routine Guide (दिनचर्या)',
      description:
        'Step-by-step instructions for an ideal Ayurvedic morning routine, yoga recommendations, and strict food combinations to avoid.',
      file: '/pdfs/Ashtang_Ayurved_Clinic_Dincharya.pdf',
      filename: 'Ashtang_Ayurved_Clinic_Dincharya.pdf',
    },
  ];

  return (
    <section id="patient-resources" className="py-16 bg-bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="text-accent-gold font-semibold uppercase tracking-[0.25em] text-sm mb-3">
            Patient Resources
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-green mb-3">
            View or download important documents
          </h2>
          <p className="text-gray-600 text-lg">
            Helpful patient documents are now available in one easy place for quick access.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {resources.map((resource) => (
            <div
              key={resource.title}
              className="bg-white rounded-3xl border border-accent-gold/20 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="rounded-2xl bg-accent-gold/15 p-3">
                  <FileText className="w-7 h-7 text-primary-green" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-primary-green mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{resource.description}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={resource.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-green px-4 py-2 text-sm font-semibold text-white hover:bg-primary-green/90 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View PDF
                </a>
                <a
                  href={resource.file}
                  download={resource.filename}
                  className="inline-flex items-center gap-2 rounded-full border border-accent-gold/40 px-4 py-2 text-sm font-semibold text-primary-green hover:bg-accent-gold/10 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
