import { useEffect } from 'react';

const caseStudies = [
  {
    id: 1,
    title: "Severe Lumbar Spondylosis & Sciatica",
    ayurvedicTerm: "Gridhrasi (Vata Vyadhi)",
    patientProfile: "Male, 45 Years, IT Professional",
    duration: "12 Weeks to Full Recovery",
    category: "Joint & Spine",
    before: [
      "Severe lower back pain persisting for 2 years.",
      "Radiating pain down the left leg (Sciatica).",
      "Unable to sit at a desk for more than 20 minutes."
    ],
    diagnosis: "Severe aggravation of Vata Dosha in the Kati Pradesha (lower back), leading to the drying of joint lubrication and nerve compression.",
    treatmentTimeline: [
      { week: "Weeks 1-2", phase: "Detox & Local Relief", action: "Kati Basti (pooling of medicated warm oils on the spine) and Patra Pinda Sweda." },
      { week: "Weeks 3-6", phase: "Internal Medicine", action: "Prescribed Trayodashang Guggulu and specific Vata-pacifying herbal decoctions." },
      { week: "Weeks 7-12", phase: "Rejuvenation & Diet", action: "Strict Vata-shamana diet (warm, grounding foods) and mild therapeutic yoga." }
    ],
    result: "95% reduction in pain. The patient has successfully returned to his 8-hour IT job without pain killers and has resumed light physical exercise."
  }
  // You can add more case studies to this array later!
];

export function CaseStudies() {
  // Ensures page starts at the top when navigating here
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fcfcf9] pt-24 pb-20 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#c59e5e] font-bold tracking-widest uppercase text-sm mb-4 block">
            Real Patients, Real Results
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#1a3b2b] mb-4">
            Healing Journeys
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore how we treat the root cause of chronic diseases through authentic Ayurvedic science and personalized care.
          </p>
        </div>

        {/* Case Study Cards Map */}
        <div className="space-y-12">
          {caseStudies.map((study) => (
            <div key={study.id} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              
              {/* Card Header */}
              <div className="bg-[#1a3b2b] p-8 sm:p-10 text-white relative">
                <div className="absolute top-0 right-0 bg-[#c59e5e] text-[#1a3b2b] text-xs font-bold px-4 py-2 rounded-bl-xl uppercase tracking-wider">
                  {study.category}
                </div>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-2">{study.title}</h2>
                <p className="text-[#c59e5e] font-medium text-lg mb-6">Ayurvedic Diagnosis: {study.ayurvedicTerm}</p>
                
                <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                  <div className="flex items-center gap-2"><span>👤</span> {study.patientProfile}</div>
                  <div className="flex items-center gap-2"><span>⏱️</span> {study.duration}</div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  
                  {/* Left Column: The Struggle & Diagnosis */}
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-xl font-bold text-[#1a3b2b] border-b-2 border-[#c59e5e]/30 pb-2 mb-4">
                        The Patient's Struggle
                      </h3>
                      <ul className="space-y-3">
                        {study.before.map((symptom, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-600">
                            <span className="text-red-400 mt-1">✗</span>
                            <span>{symptom}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-[#f8f9ea] p-6 rounded-2xl border border-emerald-100">
                      <h3 className="text-lg font-bold text-[#1a3b2b] mb-3">Our Root-Cause Analysis</h3>
                      <p className="text-gray-700 leading-relaxed text-sm">{study.diagnosis}</p>
                    </div>
                  </div>

                  {/* Right Column: The Treatment Timeline */}
                  <div>
                    <h3 className="text-xl font-bold text-[#1a3b2b] border-b-2 border-[#c59e5e]/30 pb-2 mb-6">
                      The Treatment Protocol
                    </h3>
                    
                    <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#c59e5e] before:to-transparent">
                      {study.treatmentTimeline.map((step, idx) => (
                        <div key={idx} className="relative flex items-start gap-6">
                          <div className="w-10 h-10 rounded-full bg-[#1a3b2b] text-[#c59e5e] flex items-center justify-center font-bold text-sm shrink-0 shadow-md border-2 border-white z-10">
                            {idx + 1}
                          </div>
                          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm w-full">
                            <span className="text-xs font-bold text-[#c59e5e] uppercase tracking-wider block mb-1">
                              {step.week} • {step.phase}
                            </span>
                            <p className="text-gray-700 text-sm">{step.action}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* The Result */}
                <div className="mt-12 bg-gradient-to-r from-[#1a3b2b] to-[#2a5a44] p-6 rounded-2xl text-white flex flex-col sm:flex-row items-center gap-6 shadow-lg">
                  <div className="w-16 h-16 bg-[#c59e5e] rounded-full flex items-center justify-center text-3xl shrink-0">✨</div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2">The Result</h3>
                    <p className="text-gray-200 leading-relaxed text-sm sm:text-base">{study.result}</p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}