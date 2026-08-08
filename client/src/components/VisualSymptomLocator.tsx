import { useState } from 'react';

// The 7 Chakras mapped to anatomical organs and Ayurvedic Doshas
const chakraData = [
  {
    id: 'sahasrara',
    name: 'Crown Chakra (सहस्रार)',
    sanskrit: 'Sahasrara',
    colorTheme: 'from-purple-900/50 to-emerald-900/40',
    dotColor: 'bg-purple-500',
    textColor: 'text-purple-400',
    top: '8%',   // Top of the brain
    left: '50%',
    organs: 'Cerebral Cortex, Central Nervous System',
    dosha: 'Prana Vata (Nervous System Control)',
    element: 'Cosmic Energy (ब्रह्मांडीय ऊर्जा)',
    description: 'Located at the crown of the head, it governs our connection to higher consciousness and deep spiritual peace. Physically, it relates to the upper brain and overall nervous system harmony.',
    imbalance: 'Chronic fatigue, sensitivity to light/sound, feeling disconnected, severe sleep disturbances.'
  },
  {
    id: 'ajna',
    name: 'Third Eye Chakra (आज्ञा)',
    sanskrit: 'Ajna',
    colorTheme: 'from-indigo-900/50 to-emerald-900/40',
    dotColor: 'bg-indigo-500',
    textColor: 'text-indigo-400',
    top: '16%',  // Center of forehead/brain
    left: '50%',
    organs: 'Pituitary Gland, Eyes, Lower Brain',
    dosha: 'Alochaka Pitta & Prana Vata',
    element: 'Light (प्रकाश)',
    description: 'The center of intuition and intellect. In Ayurveda, it governs the sensory intake through the eyes and the processing of thoughts in the lower brain (Hypothalamus/Pituitary axis).',
    imbalance: 'Migraines, tension headaches, blurred vision, hormonal imbalances, and severe stress.'
  },
  {
    id: 'vishuddha',
    name: 'Throat Chakra (विशुद्ध)',
    sanskrit: 'Vishuddha',
    colorTheme: 'from-blue-900/50 to-emerald-900/40',
    dotColor: 'bg-blue-400',
    textColor: 'text-blue-400',
    top: '28%',  // Throat area
    left: '50%',
    organs: 'Thyroid, Trachea, Vocal Cords',
    dosha: 'Udana Vata (Upward moving energy)',
    element: 'Ether / Space (आकाश)',
    description: 'Governs communication, expression, and the physical thyroid gland which regulates metabolism. Udana Vata controls speech, growth, and upward physical energy.',
    imbalance: 'Thyroid dysfunction (Hypo/Hyper), chronic sore throat, neck stiffness, and communication issues.'
  },
  {
    id: 'anahata',
    name: 'Heart Chakra (अनाहत)',
    sanskrit: 'Anahata',
    colorTheme: 'from-green-900/50 to-emerald-900/40',
    dotColor: 'bg-green-500',
    textColor: 'text-green-400',
    top: '42%',  // Center of chest (Heart/Lungs)
    left: '50%',
    organs: 'Heart, Lungs, Thymus Gland',
    dosha: 'Avalambaka Kapha & Vyana Vata',
    element: 'Air (वायु)',
    description: 'The physical and spiritual center of the body. It governs the cardiovascular and respiratory systems. Avalambaka Kapha provides the physical lubrication and strength to the heart and lungs.',
    imbalance: 'Asthma, shallow breathing, heart palpitations, high blood pressure, and emotional grief.'
  },
  {
    id: 'manipura',
    name: 'Solar Plexus Chakra (मणिपूर)',
    sanskrit: 'Manipura',
    colorTheme: 'from-yellow-900/50 to-emerald-900/40',
    dotColor: 'bg-yellow-400',
    textColor: 'text-yellow-400',
    top: '58%',  // Upper abdomen (Stomach/Liver)
    left: '50%',
    organs: 'Stomach, Liver, Pancreas, Small Intestine',
    dosha: 'Pachaka Pitta (Digestive Fire)',
    element: 'Fire (अग्नि)',
    description: 'The powerhouse of the body. It houses the "Agni" or digestive fire. This region is strictly responsible for metabolism, nutrient absorption, and converting food into bodily tissues.',
    imbalance: 'Severe acidity, ulcers, fatty liver, indigestion, diabetes, and chronic fatigue from poor absorption.'
  },
  {
    id: 'svadhisthana',
    name: 'Sacral Chakra (स्वाधिष्ठान)',
    sanskrit: 'Svadhisthana',
    colorTheme: 'from-orange-900/50 to-emerald-900/40',
    dotColor: 'bg-orange-500',
    textColor: 'text-orange-400',
    top: '72%',  // Lower abdomen (Intestines/Kidneys)
    left: '50%',
    organs: 'Large Intestine, Kidneys, Lower Abdomen',
    dosha: 'Apana Vata & Ranjaka Pitta',
    element: 'Water (जल)',
    description: 'Controls the fluid balance in the body and the filtration of toxins. It governs the lower digestive tract and the physical elimination of water-soluble wastes through the kidneys.',
    imbalance: 'Kidney stones, urinary tract infections (UTIs), lower back pain, and reproductive issues.'
  },
  {
    id: 'muladhara',
    name: 'Root Chakra (मूलाधार)',
    sanskrit: 'Muladhara',
    colorTheme: 'from-red-900/50 to-emerald-900/40',
    dotColor: 'bg-red-600',
    textColor: 'text-red-400',
    top: '85%',  // Base of pelvis/bladder
    left: '50%',
    organs: 'Pelvic Floor, Bladder, Base of Spine',
    dosha: 'Apana Vata (Downward moving energy)',
    element: 'Earth (पृथ्वी)',
    description: 'The foundation of the physical body. It governs bone health, skeletal structure, and the complete downward elimination of waste (Apana Vata). It provides physical stability and grounding.',
    imbalance: 'Chronic constipation, arthritis, bone density loss, sciatica, and feelings of physical insecurity.'
  }
];

export function VisualSymptomLocator() {
  const [activeChakra, setActiveChakra] = useState<typeof chakraData[0] | null>(null);

  return (
    <section className="py-12 sm:py-16 px-4 bg-emerald-950 text-white font-sans border-t border-emerald-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Elegant Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 mb-3">
            7 Healing Centers
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Learn how organs, doshas, and energy centers connect.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Anatomy Image with Chakra Dots */}
          <div className="relative flex justify-center bg-black/40 rounded-3xl p-2 border border-emerald-800/50 shadow-2xl overflow-hidden h-[500px] sm:h-[600px]">
            
            {/* Real Anatomy Image */}
            <img 
              src="/Human.png" 
              alt="Ayurvedic Human Anatomy and Chakras" 
              className="w-full h-full object-contain object-top opacity-90"
            />

            {/* The 7 Interactive Chakra Dots */}
            {chakraData.map((chakra) => {
              const isActive = activeChakra?.id === chakra.id;
              return (
                <div 
                  key={chakra.id}
                  onClick={() => setActiveChakra(chakra)}
                  className="absolute cursor-pointer group transform -translate-x-1/2 -translate-y-1/2 z-10"
                  style={{ top: chakra.top, left: chakra.left }}
                >
                  {/* Label on hover/click */}
                  <div className={`pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-slate-950/90 px-3 py-1 text-[11px] font-semibold text-white shadow-lg transition-all duration-200 ${
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100'
                  }`}>
                    {chakra.name}
                  </div>

                  {/* Outer Pulsing Glow (Only when active) */}
                  {isActive && (
                    <div className={`absolute inset-0 ${chakra.dotColor} rounded-full animate-ping opacity-60 w-10 h-10 -left-3 -top-3`} />
                  )}
                  
                  {/* The Chakra Dot */}
                  <div className={`relative w-4 h-4 sm:w-5 sm:h-5 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.75)] ring-2 ring-white/80 ${
                    isActive 
                      ? `${chakra.dotColor} border-2 border-white scale-125` 
                      : `${chakra.dotColor} border border-white/70 opacity-90 hover:scale-125 hover:opacity-100`
                  }`} />
                </div>
              );
            })}
          </div>

          {/* RIGHT SIDE: Dynamic Information Card */}
          <div className="flex flex-col h-full">
            {activeChakra ? (
              <div className={`bg-gradient-to-br ${activeChakra.colorTheme} border border-emerald-700/50 rounded-3xl p-6 sm:p-8 shadow-2xl transition-all duration-500 animate-fadeIn h-full`}>
                
                {/* Header: Name and Element */}
                <div className="mb-6 border-b border-white/10 pb-5">
                  <span className={`text-xs font-bold uppercase tracking-widest ${activeChakra.textColor} mb-1 block`}>
                    Element: {activeChakra.element}
                  </span>
                  <h3 className="text-3xl font-serif font-bold text-white mb-2">
                    {activeChakra.name}
                  </h3>
                  <span className="inline-block bg-black/30 text-gray-200 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide border border-white/10">
                    Governing Dosha: <span className="text-white">{activeChakra.dosha}</span>
                  </span>
                </div>

                {/* Organs Governed */}
                <div className="mb-5 bg-black/20 p-4 rounded-xl border border-white/5">
                  <h4 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-1">Anatomical Organs:</h4>
                  <p className="text-white text-sm font-medium">{activeChakra.organs}</p>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h4 className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-2">Ayurvedic Significance:</h4>
                  <p className="text-gray-200 text-sm leading-relaxed">
                    {activeChakra.description}
                  </p>
                </div>

                {/* Signs of Imbalance */}
                <div className="mt-auto">
                  <h4 className={`text-xs font-bold uppercase tracking-wider mb-2 ${activeChakra.textColor}`}>
                    Signs of Physical Imbalance:
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed border-l-2 border-white/20 pl-3">
                    {activeChakra.imbalance}
                  </p>
                </div>

              </div>
            ) : (
              /* Empty State */
              <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-emerald-900/10 border-2 border-emerald-800/30 border-dashed rounded-3xl">
                <div className="w-16 h-16 rounded-full bg-emerald-900/50 flex items-center justify-center mb-4 border border-emerald-800">
                  <span className="text-2xl animate-bounce">👆</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-300 mb-2">Awaken the Knowledge</h3>
                <p className="text-sm text-gray-400 max-w-sm mx-auto leading-relaxed">
                  Tap on any glowing Chakra point along the central channel to explore its corresponding physical organs and Ayurvedic Doshas.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}