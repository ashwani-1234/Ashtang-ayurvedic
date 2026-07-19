import { useState } from 'react';

// ==========================================
// 1. MAIN CONCERNS LIST (With Friendly Icons & Hindi)
// ==========================================
const concerns = [
  { id: 'joints', label: "Joint & Bone Pain (जोड़ों और हड्डियों का दर्द)", icon: "🦴" },
  { id: 'digestion', label: "Digestive Problems (पाचन और पेट की समस्या)", icon: "🍃" },
  { id: 'skin', label: "Skin Problems (त्वचा और बालों की समस्या)", icon: "✨" },
  { id: 'stress', label: "Stress & Anxiety (तनाव, चिंता और घबराहट)", icon: "🧠" },
  { id: 'sleep', label: "Sleep Problems (नींद न आना या थकान)", icon: "🌙" },
  { id: 'diabetes', label: "Diabetes Support (मधुमेह सहायता)", icon: "🩸" },
  { id: 'thyroid', label: "Thyroid Concerns (थायराइड लक्षण)", icon: "🦋" },
  { id: 'other', label: "Other General Weakness (सामान्य कमजोरी / अन्य)", icon: "➕" }
];

// ==========================================
// 2. CONDITIONAL SYMPTOM CHECKLISTS
// ==========================================
const symptomMap: Record<string, string[]> = {
  joints: ["Knee pain (घुटने में दर्द)", "Back pain (कमर दर्द)", "Neck or Shoulder pain (गर्दन/कंधे में दर्द)", "Morning stiffness (सुबह शरीर में अकड़न)", "Swelling in joints (जोड़ों में सूजन)", "Difficulty walking (चलने में परेशानी)", "Joint cracking sounds (जोड़ों से आवाज आना)"],
  digestion: ["Gas & Bloating (गैस और पेट फूलना)", "Constipation (कब्ज)", "Loose stools / Diarrhea (दस्त)", "Acidity & Heartburn (एसिडिटी या सीने में जलन)", "Poor appetite (भूख न लगना)", "Indigestion (खाना न पचना)"],
  skin: ["Severe itching (खुजली)", "Dry, rough skin (रूखी त्वचा)", "Rashes or Redness (चकत्ते या लालिमा)", "Acne / Pimples (मुंहासे)", "Eczema / Psoriasis symptoms (दाद / खाज)", "Pigmentation / Dark patches (झाइयां)", "Heavy hair fall (बाल झड़ना)"],
  stress: ["Anxiety / Worry (चिंता या घबराहट)", "Restlessness (बेचैनी)", "Poor concentration (ध्यान न लगना)", "Irritability / Anger (चिड़चिड़ापन)", "Constant fatigue (लगातार मानसिक थकान)", "Mood swings (मूड बदलना)"],
  sleep: ["Difficulty falling asleep (नींद आने में समय लगना)", "Frequent waking up at night (बार-बार नींद खुलना)", "Early morning waking (सुबह जल्दी आंख खुल जाना)", "Poor sleep quality (कच्ची नींद)", "Daytime tiredness (दिन भर सुस्ती और थकान)"],
  diabetes: ["Frequent urination (बार-बार पेशाब आना)", "Excessive thirst (बहुत ज्यादा प्यास लगना)", "Slow wound healing (घाव देर से भरना)", "Tingling / Numbness in feet (पैरों में झुनझुनी या सुन्न होना)", "Blurred vision (धुंधला दिखना)", "Constant unexplained fatigue (लगातार थकान)"],
  thyroid: ["Unexplained weight gain (अचानक वजन बढ़ना)", "Unexplained weight loss (वजन घटना)", "Severe hair fall (बाल झड़ना)", "Cold intolerance (ज्यादा ठंड लगना)", "Heat intolerance (गर्मी बर्दाश्त न होना)", "Swelling in neck (गले में सूजन / भारीपन)"],
  other: ["General body weakness (शरीर में कमजोरी)", "Low stamina (जल्दी थक जाना)", "Dizziness (चक्कर आना)", "Loss of enthusiasm (काम में मन न लगना)", "Mild body ache (हल्का बदन दर्द)"]
};

// ==========================================
// 3. RED FLAG EMERGENCY SYMPTOMS
// ==========================================
const redFlagList = [
  "Chest pain or heaviness (सीने में दर्द या भारीपन)",
  "Difficulty breathing / Shortness of breath (सांस लेने में तकलीफ)",
  "Sudden weakness or paralysis in limbs (अचानक कमजोरी या लकवा)",
  "Loss of consciousness / Fainting (बेहोशी)",
  "High fever above 102°F (तेज बुखार)",
  "Vomiting blood or Blood in stool (खून की उल्टी या मल में खून)",
  "Severe uncontrolled bleeding (तेज रक्तस्राव)",
  "Sudden loss of vision (अचानक आंखों से दिखना बंद होना)"
];

interface SymptomCheckerProps {
  onOpenBooking?: () => void;
}

export function SymptomChecker({ onOpenBooking }: SymptomCheckerProps) {
  const [step, setStep] = useState(0); // 0: Disclaimer, 1: Concern, 2: Duration, 3: Symptoms, 4: Severity, 5: History, 6: Red Flags, 7: Lead Capture, 8: Result
  
  // Assessment State
  const [concern, setConcern] = useState('joints');
  const [duration, setDuration] = useState('1–4 weeks');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [severity, setSeverity] = useState('Moderate');
  const [diagnosed, setDiagnosed] = useState('No');
  const [hasRedFlags, setHasRedFlags] = useState(false);

  // Lead Capture State
  const [userData, setUserData] = useState({ name: '', age: '', gender: 'Male', phone: '', email: '' });
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Symptom Checkbox
  const toggleSymptom = (sym: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(sym) ? prev.filter(s => s !== sym) : [...prev, sym]
    );
  };

  // Handle Red Flag Check
  const handleRedFlagSubmit = (selectedFlags: string[]) => {
    if (selectedFlags.length > 0 && !selectedFlags.includes("none")) {
      setHasRedFlags(true);
      setStep(8); // Jump directly to Emergency Screen!
    } else {
      setHasRedFlags(false);
      setStep(7); // Proceed to Lead Capture
    }
  };

  // Handle Form Submission before Results
  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userData.name || !userData.phone) {
      setErrorMsg("कृपया अपना नाम और मोबाइल नंबर अवश्य भरें (Please enter Name and Phone).");
      return;
    }
    setErrorMsg('');
    
    // Optional: Here you can do a fetch() POST request to save this lead to your database!
    console.log("New Symptom Checker Lead Captured:", { ...userData, concern, duration, severity, selectedSymptoms });
    
    setStep(8); // Show Final Report
  };

  // Determine Result Category
  const getResultCategory = () => {
    if (hasRedFlags) return 'emergency';
    if (duration === 'More than 3 months') return 'chronic';
    if (severity === 'Severe' || severity === 'Moderate') return 'moderate';
    return 'mild';
  };

  const resultType = getResultCategory();

  return (
    <section className="py-14 px-4 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white min-h-[650px] flex items-center justify-center font-sans">
      <div className="max-w-3xl w-full bg-emerald-900/70 border border-emerald-700/60 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        
        {/* ========================================== */}
        {/* STEP 0: MEDICAL DISCLAIMER (MANDATORY) */}
        {/* ========================================== */}
        {step === 0 && (
          <div className="text-center animate-fadeIn">
            <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl border border-amber-500/40">
              ⚠️
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-3">
              Ayurvedic Symptom & Health Checker
            </h2>
            <p className="text-sm text-emerald-300 mb-6 font-medium">
              अपनी स्वास्थ्य समस्या को समझें और सही मार्गदर्शन प्राप्त करें
            </p>

            <div className="bg-emerald-950/90 border-l-4 border-amber-500 p-5 rounded-r-xl text-left mb-8 shadow-inner">
              <h4 className="text-amber-400 font-bold text-sm uppercase tracking-wider mb-2">
                Important Medical Disclaimer / महत्वपूर्ण सूचना:
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                This symptom checker is for **educational and organizational purposes only**. It does not diagnose diseases or replace professional medical advice. If you are experiencing severe emergency symptoms such as chest pain, difficulty breathing, sudden weakness, heavy bleeding, or loss of consciousness, **please seek immediate hospital emergency care.**
              </p>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full sm:w-auto px-8 py-4 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-lg transition-all hover:scale-105 text-base"
            >
              🚀 Start Assessment (शुरू करें)
            </button>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 1: SELECT PRIMARY CONCERN */}
        {/* ========================================== */}
        {step === 1 && (
          <div className="animate-fadeIn">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Step 1 of 6</h3>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
              What is your primary health concern? (आपकी मुख्य समस्या क्या है?)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {concerns.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setConcern(c.id); setSelectedSymptoms([]); setStep(2); }}
                  className="p-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 border border-emerald-800 hover:border-amber-500/50 transition-all text-left flex items-center gap-3 group shadow-md"
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{c.icon}</span>
                  <span className="text-sm font-medium text-gray-200 group-hover:text-white">{c.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 2: DURATION */}
        {/* ========================================== */}
        {step === 2 && (
          <div className="animate-fadeIn">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Step 2 of 6</h3>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
              How long have you been experiencing this? (यह समस्या कब से है?)
            </h2>

            <div className="space-y-3 mb-8">
              {["Less than 1 week (1 हफ्ते से कम)", "1–4 weeks (1 से 4 हफ्ते)", "1–3 months (1 से 3 महीने)", "More than 3 months (3 महीने से ज्यादा - पुरानी समस्या)"].map((dur, i) => (
                <button
                  key={i}
                  onClick={() => { setDuration(dur.split(" (")[0]); setStep(3); }}
                  className="w-full p-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 border border-emerald-800 hover:border-amber-500/50 transition-all text-left font-medium text-sm sm:text-base text-gray-200"
                >
                  ⏱️ {dur}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(1)} className="text-xs text-emerald-400 hover:underline">← Back (पीछे जाएं)</button>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 3: SYMPTOM CHECKLIST */}
        {/* ========================================== */}
        {step === 3 && (
          <div className="animate-fadeIn">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Step 3 of 6</h3>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Which symptoms are you experiencing?
            </h2>
            <p className="text-xs text-emerald-300 mb-6">जो भी लक्षण महसूस हो रहे हों, उन पर टिक (✔) लगाएं:</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-h-72 overflow-y-auto pr-1">
              {(symptomMap[concern] || symptomMap.other).map((sym, i) => (
                <label key={i} className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-800 hover:border-emerald-600 flex items-center gap-3 cursor-pointer select-none text-sm text-gray-200">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(sym)}
                    onChange={() => toggleSymptom(sym)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-0 bg-emerald-900 border-emerald-700"
                  />
                  <span>{sym}</span>
                </label>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-emerald-800">
              <button onClick={() => setStep(2)} className="text-xs text-emerald-400 hover:underline">← Back</button>
              <button
                onClick={() => setStep(4)}
                className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow text-sm transition-transform hover:scale-105"
              >
                Next Step →
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 4: SEVERITY */}
        {/* ========================================== */}
        {step === 4 && (
          <div className="animate-fadeIn">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Step 4 of 6</h3>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
              How severe are your symptoms? (तकलीफ कितनी ज्यादा है?)
            </h2>

            <div className="space-y-3 mb-8">
              {[
                { label: "Mild (हल्की - दैनिक कार्यों में कोई बाधा नहीं)", val: "Mild", color: "border-green-600/50" },
                { label: "Moderate (मध्यम - काम करने में परेशानी होती है)", val: "Moderate", color: "border-amber-600/50" },
                { label: "Severe (गंभीर - बहुत अधिक तकलीफ और असहजता)", val: "Severe", color: "border-red-600/50" }
              ].map((s, i) => (
                <button
                  key={i}
                  onClick={() => { setSeverity(s.val); setStep(5); }}
                  className={`w-full p-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 border ${s.color} transition-all text-left font-medium text-sm sm:text-base text-gray-200`}
                >
                  📊 {s.label}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(3)} className="text-xs text-emerald-400 hover:underline">← Back</button>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 5: MEDICAL HISTORY */}
        {/* ========================================== */}
        {step === 5 && (
          <div className="animate-fadeIn">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-1">Step 5 of 6</h3>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
              Have you already been diagnosed with a condition for this?
            </h2>
            <p className="text-xs text-emerald-300 -mt-4 mb-6">क्या किसी डॉक्टर ने आपको पहले ही इस बीमारी की पुष्टि की है?</p>

            <div className="space-y-3 mb-8">
              {["Yes (हाँ, पहले से डायग्नोस है)", "No (नहीं, अभी कोई जांच नहीं हुई)", "Not sure (पक्का नहीं पता)"].map((ans, i) => (
                <button
                  key={i}
                  onClick={() => { setDiagnosed(ans.split(" (")[0]); setStep(6); }}
                  className="w-full p-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 border border-emerald-800 hover:border-amber-500/50 transition-all text-left font-medium text-sm sm:text-base text-gray-200"
                >
                  🩺 {ans}
                </button>
              ))}
            </div>
            <button onClick={() => setStep(4)} className="text-xs text-emerald-400 hover:underline">← Back</button>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 6: RED FLAG EMERGENCY SCREENING */}
        {/* ========================================== */}
        {step === 6 && (
          <div className="animate-fadeIn">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-1">Step 6 of 6 (Safety Check)</h3>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2">
              Are you experiencing any of the following emergency symptoms?
            </h2>
            <p className="text-xs text-amber-300 mb-6">कृपया ध्यान से पढ़ें। यदि इनमें से कोई भी गंभीर लक्षण है तो तुरंत अस्पताल जाएं:</p>

            <form onSubmit={(e) => {
              e.preventDefault();
              const checked = Array.from(e.currentTarget.querySelectorAll('input:checked')).map(i => (i as HTMLInputElement).value);
              handleRedFlagSubmit(checked);
            }}>
              <div className="space-y-2.5 mb-6 max-h-64 overflow-y-auto pr-1">
                {redFlagList.map((flag, i) => (
                  <label key={i} className="p-3 rounded-xl bg-red-950/30 border border-red-800/40 hover:border-red-600 flex items-center gap-3 cursor-pointer text-xs sm:text-sm text-gray-200">
                    <input type="checkbox" value={flag} className="w-4 h-4 rounded text-red-600 focus:ring-0 bg-emerald-900 border-red-700" />
                    <span>🚨 {flag}</span>
                  </label>
                ))}
                <label className="p-3 rounded-xl bg-emerald-950/90 border border-emerald-700 hover:border-emerald-500 flex items-center gap-3 cursor-pointer text-xs sm:text-sm font-semibold text-emerald-300 mt-4">
                  <input type="checkbox" value="none" className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-emerald-900 border-emerald-700" />
                  <span>✔ None of these (इनमें से कोई भी गंभीर लक्षण नहीं है)</span>
                </label>
              </div>

              <div className="flex justify-between items-center pt-4 border-t border-emerald-800">
                <button type="button" onClick={() => setStep(5)} className="text-xs text-emerald-400 hover:underline">← Back</button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-lg text-sm transition-transform hover:scale-105"
                >
                  View My Health Report →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 7: LEAD CAPTURE FORM (HIGH CONVERTING!) */}
        {/* ========================================== */}
        {step === 7 && (
          <div className="animate-fadeIn">
            <div className="text-center mb-6">
              <span className="text-4xl inline-block mb-2">📋</span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-1">
                Your Assessment is Ready! (आपकी रिपोर्ट तैयार है)
              </h2>
              <p className="text-xs text-emerald-300">
                अपनी स्वास्थ्य रिपोर्ट और डॉ. मौर्य के सुझाव देखने के लिए कृपया विवरण भरें:
              </p>
            </div>

            {errorMsg && <p className="text-xs text-red-400 bg-red-950/50 border border-red-800 p-2.5 rounded-lg mb-4 text-center">{errorMsg}</p>}

            <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">FULL NAME (पूरा नाम) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Amit Sharma"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">AGE (उम्र) *</label>
                  <input
                    type="number"
                    required
                    placeholder="e.g., 35"
                    value={userData.age}
                    onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">GENDER (लिंग)</label>
                  <select
                    value={userData.gender}
                    onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-sm focus:outline-none focus:border-amber-500"
                  >
                    <option value="Male">Male (पुरुष)</option>
                    <option value="Female">Female (महिला)</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">MOBILE NUMBER (व्हाट्सएप नंबर) *</label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={userData.phone}
                  onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">EMAIL ADDRESS (वैकल्पिक / Optional)</label>
                <input
                  type="email"
                  placeholder="patient@example.com"
                  value={userData.email}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-emerald-950 border border-emerald-700 text-white text-sm focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-lg text-base transition-transform hover:scale-[1.02] mt-4 flex items-center justify-center gap-2"
              >
                🌿 Unlock My Personalized Wellness Report
              </button>
            </form>
          </div>
        )}

        {/* ========================================== */}
        {/* STEP 8: RESULT DISPLAY & CTAS */}
        {/* ========================================== */}
        {step === 8 && (
          <div className="animate-fadeIn text-center">
            
            {/* EMERGENCY RESULT */}
            {resultType === 'emergency' && (
              <div className="bg-red-950/80 border border-red-700 rounded-2xl p-6 mb-8 text-left">
                <div className="text-red-300 font-bold text-xl mb-3">
                  <span className="text-3xl">⚠️</span> ध्यान देने योग्य स्थिति
                </div>
                <p className="text-sm text-gray-200 mb-4 leading-relaxed">
                  आपकी प्रतिक्रिया से पता चलता है कि कुछ लक्षण ऐसे हैं जिन पर सावधानी से ध्यान देना चाहिए, जैसे सीने में असहजता, सांस में तकलीफ या अचानक कमजोरी।
                </p>
                <p className="text-sm text-gray-300 mb-4 leading-relaxed">
                  यह उपकरण आपकी मदद के लिए दिशा-निर्देश देता है, यह निदान नहीं है। यह बताएगा कि कब चिकित्सकीय सलाह लेना उपयोगी हो सकता है।
                </p>
                <div className="bg-red-900/70 border border-red-700 rounded-xl p-4 text-sm text-gray-200">
                  यदि आपको असुविधा महसूस हो या लक्षण नए या बढ़ते हुए लगें, तो कृपया अपने नजदीकी स्वास्थ्य विशेषज्ञ से बिना देरी संपर्क करें।
                </div>
                <div className="mt-4 bg-emerald-950/80 border border-emerald-800 rounded-xl p-4 text-sm text-gray-300">
                  <p className="font-semibold text-emerald-200 mb-2">आप क्या कर सकते हैं:</p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>आराम करें और बड़ी हलचल से बचें।</li>
                    <li>पानी पिएं और यदि हो सके तो ताजगी भरी हवा लें।</li>
                    <li>यदि दर्द तेज हो या सांसें घुटने जैसी लगें, तो तुरंत डॉक्टर से बात करें।</li>
                  </ul>
                </div>
              </div>
            )}

            {/* CHRONIC RESULT (> 3 Months) */}
            {resultType === 'chronic' && (
              <div>
                <span className="text-5xl inline-block mb-3">🌿</span>
                <h2 className="text-2xl font-serif font-bold text-amber-400 mb-2">
                  Your Symptoms Appear to be Long-Standing (पुरानी या जीर्ण समस्या)
                </h2>
                <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  Because you have been experiencing this for **more than 3 months**, persistent symptoms deserve a comprehensive root-cause evaluation. Ayurveda excels at supporting chronic health conditions by restoring dosha balance.
                </p>
                <div className="bg-emerald-950/90 border border-emerald-800 rounded-xl p-5 text-left mb-8 max-w-xl mx-auto">
                  <h4 className="text-amber-400 font-semibold mb-2 text-sm">💡 How Ashtang Ayurved Can Help:</h4>
                  <p className="text-xs text-gray-300 leading-relaxed mb-3">
                    Ayurveda offers supportive holistic care through custom dietary modifications, lifestyle realignment, specialized herbal formulations, and detoxification therapies like **Panchkarma** or **Agni Karma** where appropriate.
                  </p>
                  <p className="text-xs text-emerald-400 font-medium">
                    ✔ We strongly recommend scheduling an in-person Nadi Pariksha (pulse examination) with Dr. Maurya for an individualized treatment plan.
                  </p>
                </div>
              </div>
            )}

            {/* MODERATE RESULT */}
            {resultType === 'moderate' && (
              <div>
                <span className="text-5xl inline-block mb-3">⚡</span>
                <h2 className="text-2xl font-serif font-bold text-amber-400 mb-2">
                  Your Responses Suggest Ongoing Active Symptoms
                </h2>
                <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  Your symptoms are currently impacting your daily comfort. Addressing them early prevents internal imbalances (Vata, Pitta, Kapha) from becoming deep-seated chronic disorders.
                </p>
                <div className="bg-emerald-950/90 border border-emerald-800 rounded-xl p-5 text-left mb-8 max-w-xl mx-auto">
                  <h4 className="text-amber-400 font-semibold mb-2 text-sm">🌿 Recommended Next Steps:</h4>
                  <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside">
                    <li>Schedule an Ayurvedic consultation for a thorough constitution (Prakriti) check.</li>
                    <li>Avoid self-medication; let an expert evaluate your digestive fire (Agni).</li>
                    <li>Follow customized dietary and herbal guidelines suited to your body build.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* MILD RESULT */}
            {resultType === 'mild' && (
              <div>
                <span className="text-5xl inline-block mb-3">🍃</span>
                <h2 className="text-2xl font-serif font-bold text-amber-400 mb-2">
                  Your Symptoms Appear to be Mild (प्रारंभिक अवस्था)
                </h2>
                <p className="text-sm text-gray-300 max-w-xl mx-auto mb-6 leading-relaxed">
                  Good news! Your symptoms seem mild and manageable. Early lifestyle adjustments and Ayurvedic preventative guidance can help quickly restore your natural balance.
                </p>
                <div className="bg-emerald-950/90 border border-emerald-800 rounded-xl p-5 text-left mb-8 max-w-xl mx-auto">
                  <h4 className="text-amber-400 font-semibold mb-2 text-sm">✔ Daily Wellness Recommendations:</h4>
                  <ul className="space-y-1.5 text-xs text-gray-300 list-disc list-inside">
                    <li>Drink adequate warm or room-temperature water throughout the day.</li>
                    <li>Follow regular meal timings and eat freshly cooked, warm food.</li>
                    <li>Ensure 7–8 hours of restful sleep every night.</li>
                    <li>Stay physically active with gentle yoga or morning walks.</li>
                    <li>Book a routine Ayurvedic checkup if symptoms persist for more than a week.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* ========================================== */}
            {/* FINAL CTA & CONTACT BUTTONS */}
            {/* ========================================== */}
            <div className="border-t border-emerald-800 pt-6 mt-4">
              <h3 className="text-lg font-serif font-bold text-white mb-1">
                Ready to Discuss Your Health with an Expert?
              </h3>
              <p className="text-xs text-gray-400 max-w-md mx-auto mb-6">
                Our Ayurvedic physician provides detailed consultations, Prakriti assessments, and personalized treatment planning in Sitapur.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 text-sm"
                >
                  🟢 Book Consultation (परामर्श बुक करें)
                </button>

                <a
                  href={`https://wa.me/918052899698?text=${encodeURIComponent(`नमस्ते डॉक्टर, मैंने वेबसाइट पर Symptom Checker का उपयोग किया है। मेरी मुख्य समस्या "${concern}" है और मैं परामर्श लेना चाहता/चाहती हूं।`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 text-sm border border-emerald-500"
                >
                  💬 WhatsApp Us
                </a>

                <a
                  href="tel:+918052899698"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-gray-200 font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 text-sm border border-emerald-800"
                >
                  📞 Call Now
                </a>
              </div>

              <button
                onClick={() => { setStep(0); setSelectedSymptoms([]); setHasRedFlags(false); }}
                className="mt-6 text-xs text-emerald-400 hover:underline inline-block"
              >
                🔄 Restart Symptom Checker
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}