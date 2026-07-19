import React from 'react';

// ==========================================
// 17 CONDITIONS GROUPED BY HEALTH CATEGORY
// ==========================================
const conditionCategories = [
  {
    title: "Joint & Spine Health",
    hindi: "जोड़ों और रीढ़ की हड्डी की देखभाल",
    icon: "🦴",
    items: [
      "Arthritis (गठिया / जोड़ों का दर्द)",
      "Back Pain (कमर दर्द)",
      "Cervical & Lumbar Spondylosis (सरवाइकल और सर्वाइकल दर्द)"
    ]
  },
  {
    title: "Metabolic & Hormonal Support",
    hindi: "हार्मोन और चयापचय संतुलन",
    icon: "🦋",
    items: [
      "Diabetes Support (मधुमेह प्रबंधन सहायता)",
      "Thyroid Disorders (थायराइड संतुलन)",
      "PCOS / PCOD (महिला हार्मोनल स्वास्थ्य)"
    ]
  },
  {
    title: "Skin Disorders & Care",
    hindi: "त्वचा रोग और एलर्जी प्रबंधन",
    icon: "✨",
    items: [
      "General Skin Disorders (त्वचा की समस्याएं)",
      "Psoriasis (सोरायसिस प्रबंधन)",
      "Eczema (एक्जिमा / पुरानी खुजली)"
    ]
  },
  {
    title: "Digestive & Liver Health",
    hindi: "पाचन तंत्र और लिवर की देखभाल",
    icon: "🍃",
    items: [
      "Digestive Disorders (पाचन और अपच की समस्या)",
      "Gastric Problems (गैस, एसिडिटी और कब्ज)",
      "Fatty Liver Support (फैटी लिवर प्रबंधन)"
    ]
  },
  {
    title: "Respiratory & Immunity",
    hindi: "श्वसन और रोग प्रतिरोधक क्षमता",
    icon: "🫁",
    items: [
      "Asthma Support (दमा / सांस फूलना)",
      "Allergies (एलर्जी और बार-बार जुकाम)"
    ]
  },
  {
    title: "Mental Wellness & Pain",
    hindi: "मानसिक शांति और सिरदर्द प्रबंधन",
    icon: "🧠",
    items: [
      "Migraine (माइग्रेन / पुराना सिरदर्द)",
      "Stress & Anxiety (तनाव, चिंता और घबराहट)",
      "Insomnia (अनिद्रा / नींद न आने की समस्या)"
    ]
  }
];

interface ConditionsProps {
  onOpenBooking?: () => void;
}

export function ConditionsWeManage({ onOpenBooking }: ConditionsProps) {
  return (
    <section className="py-16 px-4 bg-emerald-950 text-white relative overflow-hidden border-t border-emerald-900 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* ========================================== */}
        {/* HEADER & ETHICAL COMPLIANCE BANNER */}
        {/* ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Holistic Health Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            We Help Manage & Support
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
            At Ashtang Ayurved, we believe in addressing the root cause of chronic imbalance. Through **supportive Ayurvedic care**, lifestyle realignment, and **personalized treatment protocols**, we assist patients in the long-term management of chronic health conditions.
          </p>
        </div>

        {/* ========================================== */}
        {/* CATEGORIZED CONDITIONS GRID */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {conditionCategories.map((cat, idx) => (
            <div 
              key={idx}
              className="bg-emerald-900/40 border border-emerald-800/80 rounded-2xl p-6 hover:border-amber-500/50 transition-all duration-300 hover:bg-emerald-900/60 flex flex-col justify-between shadow-lg group"
            >
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <div>
                    <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-emerald-400 font-medium">
                      {cat.hindi}
                    </p>
                  </div>
                </div>

                <ul className="space-y-2.5 mt-4 pt-4 border-t border-emerald-800/60 text-sm text-gray-300">
                  {cat.items.map((item, itemIdx) => (
                    <li key={itemIdx} className="flex items-start gap-2.5">
                      <span className="text-amber-500 mt-0.5">✔</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* BOTTOM CALL TO ACTION */}
        {/* ========================================== */}
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 border border-emerald-700/60 rounded-2xl p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
              Don't See Your Condition Listed Here?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300">
              Consult with Dr. Brahma Prakash Maurya for a detailed Nadi Pariksha (pulse assessment) to explore a personalized Ayurvedic management plan.
            </p>
          </div>
          <a
            href={`https://wa.me/918052899698?text=${encodeURIComponent(
              `नमस्ते डॉक्टर, मैंने वेबसाइट पर Symptom Checker का उपयोग किया है। मैं परामर्श लेना चाहता/चाहती हूं।`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 text-sm border border-emerald-500"
          >
            📅 Book Consultation
          </a>
        </div>

      </div>
    </section>
  );
}