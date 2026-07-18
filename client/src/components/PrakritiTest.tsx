import { useState } from 'react';

// ==========================================
// 15 HINDI AYURVEDIC QUESTIONS WITH SCORES (+2)
// ==========================================
const questions = [
  {
    id: 1,
    title: "Question 1 – Body Frame (शरीर की बनावट)",
    question: "आपकी शारीरिक बनावट कैसी है?",
    options: [
      { text: "पतला, हल्का शरीर; वजन बढ़ाना मुश्किल होता है", type: "vata" },
      { text: "मध्यम, गठीला या एथलेटिक शरीर", type: "pitta" },
      { text: "चौड़ा और मजबूत शरीर; वजन आसानी से बढ़ जाता है", type: "kapha" },
    ]
  },
  {
    id: 2,
    title: "Question 2 – Skin (त्वचा)",
    question: "आपकी त्वचा (स्किन) कैसी रहती है?",
    options: [
      { text: "रूखी (Dry), खुरदरी और ठंडी", type: "vata" },
      { text: "गर्म, मुलायम, संवेदनशील; जल्दी लाल या रैश होने वाली", type: "pitta" },
      { text: "चिकनी, मोटी, हल्की तैलीय (Oily) और ठंडी", type: "kapha" },
    ]
  },
  {
    id: 3,
    title: "Question 3 – Hair (बाल)",
    question: "आपके बाल आम तौर पर कैसे हैं?",
    options: [
      { text: "रूखे, पतले और हल्के घुंघराले", type: "vata" },
      { text: "पतले, सीधे; समय से पहले सफेद होना या झड़ना", type: "pitta" },
      { text: "घने, मजबूत, तैलीय और लहरदार", type: "kapha" },
    ]
  },
  {
    id: 4,
    title: "Question 4 – Appetite (भूख)",
    question: "आपकी भूख कैसी लगती है?",
    options: [
      { text: "अनियमित; कभी बहुत तेज भूख लगती है, कभी बिल्कुल नहीं", type: "vata" },
      { text: "बहुत तेज भूख; खाना मिलने में देरी हो तो चिड़चिड़ापन होता है", type: "pitta" },
      { text: "सामान्य और स्थिर भूख; आसानी से रह सकते हैं", type: "kapha" },
    ]
  },
  {
    id: 5,
    title: "Question 5 – Digestion (पाचन तंत्र)",
    question: "आपका पाचन (डाइजेशन) कैसा रहता है?",
    options: [
      { text: "गैस, पेट फूलना (Bloating) या कब्ज की शिकायत रहती है", type: "vata" },
      { text: "मजबूत पाचन; एसिडिटी, जलन या खट्टी डकारें आ सकती हैं", type: "pitta" },
      { text: "धीमा पाचन; खाना खाने के बाद भारीपन और सुस्ती महसूस होती है", type: "kapha" },
    ]
  },
  {
    id: 6,
    title: "Question 6 – Sleep (नींद)",
    question: "आपको नींद कैसी आती है?",
    options: [
      { text: "हल्की और कच्ची नींद; थोड़ी सी आहट से आंख खुल जाती है", type: "vata" },
      { text: "सामान्य और अच्छी नींद; समय पर खुलती है", type: "pitta" },
      { text: "गहरी और लंबी नींद; सुबह उठने में भारीपन लगता है", type: "kapha" },
    ]
  },
  {
    id: 7,
    title: "Question 7 – Energy Level (ऊर्जा का स्तर)",
    question: "दिन भर आपकी ऊर्जा (Energy) का स्तर कैसा रहता है?",
    options: [
      { text: "अचानक तेजी से ऊर्जा आती है, लेकिन जल्दी थक जाते हैं", type: "vata" },
      { text: "मजबूत, एकाग्र (Focused) और लक्ष्य के प्रति समर्पित", type: "pitta" },
      { text: "पूरे दिन एक समान और स्थिर ऊर्जा बनी रहती है", type: "kapha" },
    ]
  },
  {
    id: 8,
    title: "Question 8 – Weather Preference (मौसम की पसंद)",
    question: "आपको कौन सा मौसम सबसे ज्यादा पसंद है?",
    options: [
      { text: "गर्म और धूप वाला मौसम पसंद है", type: "vata" },
      { text: "ठंडा और सुहावना मौसम पसंद है", type: "pitta" },
      { text: "सूखा और गर्म मौसम पसंद है", type: "kapha" },
    ]
  },
  {
    id: 9,
    title: "Question 9 – Walking Style (चलने का तरीका)",
    question: "आपके चलने की गति कैसी है?",
    options: [
      { text: "तेज और हल्के कदम", type: "vata" },
      { text: "उद्देश्यपूर्ण, सधे हुए और आत्मविश्वास से भरे कदम", type: "pitta" },
      { text: "धीमी गति, शांत और आराम से", type: "kapha" },
    ]
  },
  {
    id: 10,
    title: "Question 10 – Speaking Style (बोलने का तरीका)",
    question: "लोग आपके बोलने के तरीके को कैसे बताते हैं?",
    options: [
      { text: "तेज गति से और बहुत उत्साह के साथ बोलना", type: "vata" },
      { text: "स्पष्ट, सटीक और प्रभावशाली तरीके से बोलना", type: "pitta" },
      { text: "शांत, मधुर और धीमी आवाज में बोलना", type: "kapha" },
    ]
  },
  {
    id: 11,
    title: "Question 11 – Memory (याददाश्त)",
    question: "आपकी याददाश्त (Memory) कैसी है?",
    options: [
      { text: "जल्दी सीखते हैं लेकिन जल्दी भूल भी जाते हैं", type: "vata" },
      { text: "अच्छी तरह सीखते हैं और सटीक याद रखते हैं", type: "pitta" },
      { text: "सीखने में समय लगता है, लेकिन एक बार याद हो जाए तो कभी नहीं भूलते", type: "kapha" },
    ]
  },
  {
    id: 12,
    title: "Question 12 – Personality (व्यक्तित्व)",
    question: "आपका स्वभाव और व्यक्तित्व कैसा है?",
    options: [
      { text: "रचनात्मक (Creative), कल्पनाशील और नए विचारों वाले", type: "vata" },
      { text: "महत्वाकांक्षी (Ambitious), निडर और लक्ष्य पाने की जिद वाले", type: "pitta" },
      { text: "शांत, धैर्यवान, क्षमाशील और दूसरों की देखभाल करने वाले", type: "kapha" },
    ]
  },
  {
    id: 13,
    title: "Question 13 – Stress Response (तनाव में प्रतिक्रिया)",
    question: "तनाव (Stress) या दबाव के समय आप कैसा महसूस करते हैं?",
    options: [
      { text: "घबराहट, चिंता (Anxiety) और बेचैनी होने लगती है", type: "vata" },
      { text: "गुस्सा, चिड़चिड़ापन या बहस करने का मन करता है", type: "pitta" },
      { text: "शांत हो जाते हैं, सुस्त पड़ जाते हैं या सबसे अलग हो जाते हैं", type: "kapha" },
    ]
  },
  {
    id: 14,
    title: "Question 14 – Climate Effect (मौसम का प्रभाव)",
    question: "कौन सा मौसम आपको सबसे ज्यादा परेशान करता है?",
    options: [
      { text: "ठंड, तेज हवा और रूखा मौसम", type: "vata" },
      { text: "तेज धूप, उमस और ज्यादा गर्मी", type: "pitta" },
      { text: "ठंडा, सीलन (Damp) और नमी वाला मौसम", type: "kapha" },
    ]
  },
  {
    id: 15,
    title: "Question 15 – Activity Level (दैनिक सक्रियता)",
    question: "आपकी दैनिक शारीरिक सक्रियता कैसी है?",
    options: [
      { text: "बहुत सक्रिय, लेकिन जल्दी अति कर देते हैं (Inconsistent)", type: "vata" },
      { text: "अच्छी सहनशक्ति के साथ नियमित और ऊर्जावान", type: "pitta" },
      { text: "धीमी गति पसंद है; आराम करना ज्यादा अच्छा लगता है", type: "kapha" },
    ]
  }
];

interface PrakritiTestProps {
  onOpenBooking?: () => void;
}

export function PrakritiTest({ onOpenBooking }: PrakritiTestProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState({ vata: 0, pitta: 0, kapha: 0 });
  const [result, setResult] = useState<string | null>(null);

  // Handle Option Click (+2 Points as requested!)
  const handleSelect = (type: string) => {
    const updatedScores = {
      ...scores,
      [type]: scores[type as keyof typeof scores] + 2
    };
    setScores(updatedScores);

    // If more questions exist, go to next
    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Final Dosha
      calculateResult(updatedScores);
    }
  };

  const calculateResult = (finalScores: { vata: number; pitta: number; kapha: number }) => {
    const { vata, pitta, kapha } = finalScores;
    if (vata > pitta && vata > kapha) {
      setResult("Vata");
    } else if (pitta > vata && pitta > kapha) {
      setResult("Pitta");
    } else if (kapha > vata && kapha > pitta) {
      setResult("Kapha");
    } else {
      setResult("Dual Dosha");
    }
  };

  const resetQuiz = () => {
    setScores({ vata: 0, pitta: 0, kapha: 0 });
    setCurrentStep(0);
    setResult(null);
  };

  const currentQ = questions[currentStep];
  const progressPercentage = Math.round(((currentStep + 1) / questions.length) * 100);

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white min-h-[600px] flex items-center justify-center">
      <div className="max-w-3xl w-full bg-emerald-900/60 border border-emerald-700/50 rounded-2xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
        
        {/* ========================================== */}
        {/* QUIZ IN PROGRESS (STEP BY STEP) */}
        {/* ========================================== */}
        {!result ? (
          <div>
            {/* Header & Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
                <span>प्रश्न {currentStep + 1} / {questions.length}</span>
                <span>{progressPercentage}% पूरा हुआ</span>
              </div>
              <div className="w-full bg-emerald-950 h-2.5 rounded-full overflow-hidden border border-emerald-800">
                <div 
                  className="bg-amber-500 h-full transition-all duration-300 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Question Title */}
            <h3 className="text-sm font-medium text-amber-400 uppercase tracking-wide mb-1">
              {currentQ.title}
            </h3>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-6">
              {currentQ.question}
            </h2>

            {/* Options Buttons */}
            <div className="space-y-4">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelect(opt.type)}
                  className="w-full text-left p-4 sm:p-5 rounded-xl bg-emerald-950/80 hover:bg-emerald-800 border border-emerald-800 hover:border-amber-500/50 transition-all duration-200 flex items-center group shadow-md"
                >
                  <span className="w-8 h-8 rounded-full bg-emerald-900 border border-emerald-600 group-hover:bg-amber-500 group-hover:text-emerald-950 font-bold flex items-center justify-center mr-4 text-sm transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base font-medium text-gray-200 group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>

            <p className="text-center text-xs text-emerald-400/60 mt-6">
              💡 सही आकलन के लिए वही विकल्प चुनें जो आपके प्राकृतिक स्वभाव से सबसे ज्यादा मेल खाता हो।
            </p>
          </div>
        ) : (
          /* ========================================== */
          /* RESULT PAGE (TRANSLATED TO HINDI) */
          /* ========================================== */
          <div className="text-center animate-fadeIn">
            
            {/* VATA RESULT */}
            {result === "Vata" && (
              <div>
                <span className="text-5xl inline-block mb-3">🍃</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mb-2">
                  वात प्रधान प्रकृति (Vata Dominant)
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
                  आपकी शारीरिक और मानसिक प्रकृति मुख्य रूप से **वात (Vata)** है। वात प्रकृति के लोग बेहद ऊर्जावान, रचनात्मक और जल्दी सीखने वाले होते हैं। असंतुलन होने पर आपको त्वचा में रूखापन, गैस, कब्ज या नींद में खलल की समस्या हो सकती है।
                </p>
                <div className="bg-emerald-950/80 border border-emerald-800 rounded-xl p-5 text-left mb-8 max-w-xl mx-auto">
                  <h4 className="text-amber-400 font-semibold mb-3 flex items-center">
                    🌿 आपके लिए सामान्य स्वास्थ्य सुझाव:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                    <li>हमेशा गर्म, ताजा और सुपाच्य भोजन को प्राथमिकता दें।</li>
                    <li>खाने और सोने का एक निश्चित समय (रूटीन) बनाए रखें।</li>
                    <li>दिन भर पर्याप्त पानी और गुनगुना पेय पीते रहें।</li>
                    <li>हल्का योग, प्राणायाम और ध्यान (Meditation) नियमित करें।</li>
                    <li>डॉक्टर की सलाह अनुसार गुनगुने तेल (तिल के तेल) से अभ्यंग (मालिश) करें।</li>
                  </ul>
                </div>
              </div>
            )}

            {/* PITTA RESULT */}
            {result === "Pitta" && (
              <div>
                <span className="text-5xl inline-block mb-3">🔥</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mb-2">
                  पित्त प्रधान प्रकृति (Pitta Dominant)
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
                  आपकी प्रकृति मुख्य रूप से **पित्त (Pitta)** है। पित्त प्रकृति के लोग कुशाग्र बुद्धि, समर्पित और बेहतरीन नेतृत्व क्षमता वाले होते हैं। आपका पाचन तेज होता है, लेकिन असंतुलन होने पर एसिडिटी, जलन, गुस्सा या त्वचा में लालिमा की शिकायत हो सकती है।
                </p>
                <div className="bg-emerald-950/80 border border-emerald-800 rounded-xl p-5 text-left mb-8 max-w-xl mx-auto">
                  <h4 className="text-amber-400 font-semibold mb-3 flex items-center">
                    🌿 आपके लिए सामान्य स्वास्थ्य सुझाव:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                    <li>शीतल (Cooling) और संतुलित आहार लें; बहुत गर्म या मसालेदार खाने से बचें।</li>
                    <li>गर्मी के मौसम में शरीर को भरपूर हाइड्रेटेड रखें।</li>
                    <li>ज्यादा तेल-मसाले और खट्टे पदार्थों का सेवन सीमित करें।</li>
                    <li>काम के बीच में आराम करें और तनाव प्रबंधन (Stress Management) पर ध्यान दें।</li>
                    <li>अष्टांग आयुर्वेद के चिकित्सक से अपने लिए एक विशेष दिनचर्या तैयार करवाएं।</li>
                  </ul>
                </div>
              </div>
            )}

            {/* KAPHA RESULT */}
            {result === "Kapha" && (
              <div>
                <span className="text-5xl inline-block mb-3">🌿</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mb-2">
                  कफ प्रधान प्रकृति (Kapha Dominant)
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
                  आपकी प्रकृति मुख्य रूप से **कफ (Kapha)** है। कफ प्रकृति के लोग स्वभाव से बेहद शांत, स्थिर, धैर्यवान और मजबूत रोग प्रतिरोधक क्षमता (Stamina) वाले होते हैं। असंतुलन होने पर सुस्ती, वजन बढ़ना या पाचन धीमा होने की समस्या हो सकती है।
                </p>
                <div className="bg-emerald-950/80 border border-emerald-800 rounded-xl p-5 text-left mb-8 max-w-xl mx-auto">
                  <h4 className="text-amber-400 font-semibold mb-3 flex items-center">
                    🌿 आपके लिए सामान्य स्वास्थ्य सुझाव:
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300 list-disc list-inside">
                    <li>प्रतिदिन नियमित रूप से शारीरिक व्यायाम और योग जरूर करें।</li>
                    <li>हल्का, गर्म और ताजा पका हुआ भोजन करें।</li>
                    <li>जरूरत से ज्यादा खाने और दिन में सोने (दिवारस्वाप) से बचें।</li>
                    <li>सुबह जल्दी उठने और सक्रिय रहने की आदत डालें।</li>
                    <li>वजन और ऊर्जा को संतुलित रखने के लिए डॉक्टरी परामर्श लें।</li>
                  </ul>
                </div>
              </div>
            )}

            {/* DUAL DOSHA RESULT */}
            {result === "Dual Dosha" && (
              <div>
                <span className="text-5xl inline-block mb-3">🌗</span>
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-400 mb-2">
                  मिश्रित प्रकृति (Dual Dosha Constitution)
                </h2>
                <p className="text-sm sm:text-base text-gray-300 mb-6 max-w-xl mx-auto leading-relaxed">
                  आपके उत्तरों से पता चलता है कि आपकी प्रकृति दो दोषों का मिश्रण है (जैसे **वात-पित्त**, **पित्त-कफ**, या **वात-कफ**)। अधिकांश लोगों में मिश्रित प्रकृति पाई जाती है। आपकी सटीक नाड़ी और स्थिति जानने के लिए विशेषज्ञ चिकित्सक का परामर्श आवश्यक है।
                </p>
              </div>
            )}

            {/* ========================================== */}
            {/* FINAL CTA (TRANSLATED TO HINDI) */}
            {/* ========================================== */}
            <div className="border-t border-emerald-800 pt-6 mt-6">
              <h3 className="text-lg font-serif font-bold text-white mb-2">
                🌿 आपका प्रकृति परीक्षण पूरा हुआ!
              </h3>
              <p className="text-xs text-gray-400 max-w-lg mx-auto mb-6">
                यह ऑनलाइन क्विज़ केवल आपकी आयुर्वेदिक प्रकृति का एक सामान्य अनुमान है। सटीक **नाड़ी परीक्षा (Pulse Diagnosis)**, पंचकर्म और व्यक्तिगत उपचार योजना के लिए हमारे अनुभवी चिकित्सक डॉ. मौर्य से परामर्श लें।
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  📅 परामर्श बुक करें (Book Appointment)
                </button>

                <a
                  href="https://wa.me/918052899698?text=नमस्ते%20डॉक्टर,%20मैंने%20वेबसाइट%20पर%20प्रकृति%20टेस्ट%20किया%20है%20और%20मैं%20परामर्श%20लेना%20चाहता/चाहती%20हूं।"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg transition-transform hover:scale-105 flex items-center justify-center gap-2 border border-emerald-500"
                >
                  💬 WhatsApp पर बात करें
                </a>

                <a
                  href="tel:+918052899698"
                  className="w-full sm:w-auto px-6 py-3.5 bg-emerald-950 hover:bg-emerald-900 text-gray-200 font-bold rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2 border border-emerald-800"
                >
                  📞 कॉल करें
                </a>
              </div>

              <button
                onClick={resetQuiz}
                className="mt-6 text-xs text-emerald-400 hover:underline inline-block"
              >
                🔄 टेस्ट दोबारा शुरू करें (Retake Quiz)
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}