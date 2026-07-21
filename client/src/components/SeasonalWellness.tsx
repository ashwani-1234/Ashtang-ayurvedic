import { useState, useEffect } from 'react';

// ==========================================
// AYURVEDIC SEASONAL DATA (ENGLISH + HINDI)
// ==========================================
const seasonalData = [
  {
    id: 'monsoon',
    name: "Monsoon (वर्षा ऋतु - Varsha Ritu)",
    months: "July to September",
    tagline: "Pacify Vata & Protect Digestive Fire (Agni)",
    icon: "🌧️",
    badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    overview: "During the monsoon, humidity rises and the digestive fire (Mandagni) naturally weakens. Vata dosha increases, leading to joint stiffness, indigestion, and sluggish immunity.",
    tips: [
      {
        category: "Foods to Eat (क्या खाएं)",
        icon: "🥗",
        items: [
          "Light, warm, and freshly cooked meals (मूंग की दाल, खिचड़ी)",
          "Warm spices: Ginger, Black Pepper, Cumin, and Turmeric",
          "Old rice, barley, and cow's ghee in moderate amounts",
          "Sip warm or boiled-and-cooled water throughout the day"
        ]
      },
      {
        category: "Foods to Avoid (क्या न खाएं)",
        icon: "🚫",
        items: [
          "Heavy, oily, deep-fried, and street foods (बाहर का तला-भुना)",
          "Cold drinks, ice creams, and refrigerated water",
          "Excessive leafy greens and raw salads (hard to digest in rains)",
          "Curd (दही) and sour foods especially at night"
        ]
      },
      {
        category: "Yoga & Pranayama (योग और प्राणायाम)",
        icon: "🧘",
        items: [
          "Gentle indoor stretching and Pawanmuktasana for digestion",
          "Nadi Shodhana (Anulom Vilom) to balance Vata nervous energy",
          "Bhramari Pranayama to calm anxiety and weather-induced stress",
          "Avoid exhausting, heavy physical workouts during high humidity"
        ]
      },
      {
        category: "Essential Herbs (आयुर्वेदिक जड़ी-बूटियां)",
        icon: "🌿",
        items: [
          "Trikatu Churna (to stimulate digestive fire and clear toxins)",
          "Giloy / Guduchi (powerful defense against monsoon fevers)",
          "Tulsi and Dry Ginger tea (सोंठ और तुलसी की चाय) for respiratory defense",
          "Ashwagandha for maintaining joint strength and stamina"
        ]
      },
      {
        category: "Skin & Hair Care (त्वचा और बालों की देखभाल)",
        icon: "✨",
        items: [
          "Keep skin dry and clean to prevent fungal infections and eczema",
          "Use Neem and Turmeric water for bathing (नीम और हल्दी का पानी)",
          "Avoid heavy chemical hair oils; use light Bhringraj oil before wash",
          "Dry hair completely after washing; dampness increases scalp issues"
        ]
      },
      {
        category: "Immunity Booster (रोग प्रतिरोधक क्षमता)",
        icon: "🛡️",
        items: [
          "Daily Golden Milk (हल्दी वाला दूध) before bedtime",
          "Chyawanprash (1 tsp in the morning) to protect respiratory channels",
          "Perform warm oil foot massage (Padabhyanga) before sleeping",
          "Keep living spaces well-ventilated and dry to avoid dampness"
        ]
      }
    ]
  },
  {
    id: 'autumn',
    name: "Autumn (शरद ऋतु - Sharad Ritu)",
    months: "October to November",
    tagline: "Natural Detox & Pitta Pacification",
    icon: "🍂",
    badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    overview: "As the rains stop and the sun beats down again, accumulated Pitta dosha gets aggravated, leading to acidity, skin rashes, and irritability. The goal is cooling and purification.",
    tips: [
      { category: "Foods to Eat (क्या खाएं)", icon: "🥗", items: ["Naturally sweet, bitter, and astringent foods", "Cow's ghee, milk, and cooling grains like wheat and barley", "Fresh sweet fruits like pomegranate, apples, and ripe bananas"] },
      { category: "Foods to Avoid (क्या न खाएं)", icon: "🚫", items: ["Spicy, sour, and fermented foods (मसालेदार और खट्टा भोजन)", "Excessive garlic, onions, and green chilies", "Heavy fried snacks and alcohol that increase body heat"] },
      { category: "Yoga & Pranayama (योग और प्राणायाम)", icon: "🧘", items: ["Sheetali and Sheetkari Pranayama for internal cooling", "Chandra Namaskar (Moon Salutation) in the cool evening", "Meditation under moonlight (Moon bathing / शरद पूर्णिमा स्नान)"] },
      { category: "Essential Herbs (आयुर्वेदिक जड़ी-बूटियां)", icon: "🌿", items: ["Amla (Gooseberry) - the ultimate Pitta cooler and vitamin C boost", "Shatavari and Brahmi for soothing the nervous system", "Avipattikar Churna for relieving heartburn and acidity"] },
      { category: "Skin & Hair Care (त्वचा और बालों की देखभाल)", icon: "✨", items: ["Apply Chandan (Sandalwood) and Rose water paste for rashes", "Use cooling Coconut oil or Brahmi oil for scalp massage", "Avoid direct exposure to harsh afternoon sun"] },
      { category: "Immunity Booster (रोग प्रतिरोधक क्षमता)", icon: "🛡️", items: ["Panchakarma Virechana (therapeutic purgation) under doctor guidance", "Drink water stored in silver or copper vessels", "Maintain regular moderate sleep schedules"] }
    ]
  },
  {
    id: 'winter',
    name: "Winter (हेमंत / शिशिर ऋतु - Hemanta Ritu)",
    months: "December to February",
    tagline: "Build Stamina & Nourish Deep Tissues",
    icon: "❄️",
    badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    overview: "Winter is the season of peak bodily strength! Digestive fire (Agni) is strongest, allowing the body to digest heavier, nourishing foods that build deep tissue immunity and stamina.",
    tips: [
      { category: "Foods to Eat (क्या खाएं)", icon: "🥗", items: ["Nourishing, warm, and healthy fats like ghee, sesame oil, and nuts", "Seasonal vegetables, root vegetables, and warm soups", "Sesame seeds (तिल), jaggery (गुड़), and dry fruits"] },
      { category: "Foods to Avoid (क्या न खाएं)", icon: "🚫", items: ["Cold, dry, and light foods (रूखा-सूखा भोजन)", "Cold drinks and direct salads straight from the fridge", "Skipping meals (strong digestion will burn tissues if empty)"] },
      { category: "Yoga & Pranayama (योग और प्राणायाम)", icon: "🧘", items: ["Active Surya Namaskar (Sun Salutations) to generate internal warmth", "Bhastrika and Kapalabhati Pranayama to keep lungs clear", "Regular energetic morning walks in fresh sun"] },
      { category: "Essential Herbs (आयुर्वेदिक जड़ी-बूटियां)", icon: "🌿", items: ["Ashwagandha and Shilajit for vitality and muscle strength", "Chyawanprash daily with warm milk", "Tulsi and Ginger for winter throat protection"] },
      { category: "Skin & Hair Care (त्वचा और बालों की देखभाल)", icon: "✨", items: ["Daily Abhyanga (full body massage) with warm Sesame (Til) oil", "Use moisturizing almond oil or malai for dry facial skin", "Avoid washing hair with very hot water (use lukewarm water)"] },
      { category: "Immunity Booster (रोग प्रतिरोधक क्षमता)", icon: "🛡️", items: ["Sun bathing (धूप सेकना) for natural Vitamin D and warmth", "Incorporate herbal steam inhalation once a week", "Enjoy nourishing herbal broths and spiced warm milk"] }
    ]
  },
  {
    id: 'summer',
    name: "Spring & Summer (वसंत / ग्रीष्म ऋतु - Grishma)",
    months: "March to June",
    tagline: "Clear Kapha & Prevent Dehydration",
    icon: "☀️",
    badgeColor: "bg-orange-500/20 text-orange-300 border-orange-500/40",
    overview: "As heat rises, accumulated winter Kapha melts (Spring), followed by intense summer dehydration that depletes bodily energy. The focus shifts from detoxing to deep cooling hydration.",
    tips: [
      { category: "Foods to Eat (क्या खाएं)", icon: "🥗", items: ["Water-rich fruits: Watermelon, Muskmelon, Cucumber, Coconut water", "Cooling drinks: Sattu, Buttermilk (छाछ) with roasted cumin, Mint water", "Light, easily digestible meals with moderate ghee"] },
      { category: "Foods to Avoid (क्या न खाएं)", icon: "🚫", items: ["Heavy, salty, spicy, and deep-fried foods", "Ice-chilled water (shocks digestive fire; use earthen pot / मटके का पानी)", "Excessive tea, coffee, and alcohol"] },
      { category: "Yoga & Pranayama (योग और प्राणायाम)", icon: "🧘", items: ["Sheetali and Sheetkari cooling breathwork", "Gentle restorative yoga in cool morning or evening hours", "Avoid heavy cardio during peak afternoon sun"] },
      { category: "Essential Herbs (आयुर्वेदिक जड़ी-बूटियां)", icon: "🌿", items: ["Usheera (Vetiver) water for deep cellular cooling", "Shatavari and Guduchi to prevent summer fatigue", "Brahmi syrup or fresh mint infusion for heat relief"] },
      { category: "Skin & Hair Care (त्वचा और बालों की देखभाल)", icon: "✨", items: ["Apply Multani Mitti (Fuller's Earth) and Rose water pack for oiliness", "Use Aloe Vera gel to soothe sunburns and heat rashes", "Protect head from direct hot winds (Loo / लू) with a cotton scarf"] },
      { category: "Immunity Booster (रोग प्रतिरोधक क्षमता)", icon: "🛡️", items: ["Drink electrolyte-rich ORS or lemon-salt-sugar water naturally", "Take a short 20-minute power nap in extreme summer afternoon heat", "Schedule spring Panchakarma (Vamana/Nasya) for clearing sinus Kapha"] }
    ]
  }
];

interface SeasonalProps {
  onOpenBooking?: () => void;
}

export function SeasonalWellness({ onOpenBooking }: SeasonalProps) {
  const [activeTab, setActiveTab] = useState<string>('monsoon');
  const [detectedSeasonName, setDetectedSeasonName] = useState<string>('');

  // Auto-Detect Current Season based on Browser Month
  useEffect(() => {
    const month = new Date().getMonth(); // 0 = Jan, 6 = July
    let current = 'monsoon';
    
    if (month >= 6 && month <= 8) {
      current = 'monsoon'; // Jul - Sep
    } else if (month >= 9 && month <= 10) {
      current = 'autumn'; // Oct - Nov
    } else if (month === 11 || month <= 1) {
      current = 'winter'; // Dec - Feb
    } else {
      current = 'summer'; // Mar - Jun
    }

    setActiveTab(current);
    const found = seasonalData.find(s => s.id === current);
    if (found) setDetectedSeasonName(found.name.split(" (")[0]);
  }, []);

  const currentSeason = seasonalData.find(s => s.id === activeTab) || seasonalData[0];

  return (
    // Added id="seasonal-wellness" so your Navbar link can scroll directly here!
    <section id="seasonal-wellness" className="py-16 px-4 bg-gradient-to-b from-emerald-950 via-emerald-900 to-emerald-950 text-white font-sans border-t border-emerald-800 relative scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        
        {/* ========================================== */}
        {/* HEADER & AUTO-DETECTION BADGE */}
        {/* ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fadeIn">
          
          {/* Live Auto-Detected Banner */}
          {detectedSeasonName && (
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-500/50 text-amber-300 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-4 shadow-inner">
              <span className="animate-pulse">🟢</span>
              <span>Live Auto-Detected Season: <strong>{detectedSeasonName}</strong></span>
            </div>
          )}

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Seasonal Ayurvedic Wellness (ऋतुचर्या)
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            In Ayurveda, your diet and lifestyle must change with the weather to prevent diseases. Explore our active clinical guidelines for the current season to keep your Doshas balanced all year round.
          </p>
        </div>

        {/* ========================================== */}
        {/* SEASON SWITCHER TABS */}
        {/* ========================================== */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
          {seasonalData.map((s) => {
            const isActive = activeTab === s.id;
            return (
              <button
                key={s.id}
                onClick={() => setActiveTab(s.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-2 border ${
                  isActive
                    ? 'bg-amber-500 text-emerald-950 border-amber-400 shadow-lg scale-105'
                    : 'bg-emerald-950/80 text-gray-300 border-emerald-800 hover:bg-emerald-800 hover:text-white'
                }`}
              >
                <span className="text-lg">{s.icon}</span>
                <span>{s.name.split(" - ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================== */}
        {/* ACTIVE SEASON OVERVIEW BANNER */}
        {/* ========================================== */}
        <div className="bg-emerald-950/90 border border-emerald-700/80 rounded-2xl p-6 sm:p-8 mb-10 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-emerald-800/80 pb-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider border mb-2 ${currentSeason.badgeColor}`}>
                {currentSeason.months}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white flex items-center gap-3">
                <span>{currentSeason.icon}</span>
                <span>{currentSeason.name}</span>
              </h3>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-xs text-emerald-400 block font-semibold">Primary Clinical Focus:</span>
              <span className="text-sm font-bold text-amber-400">{currentSeason.tagline}</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
            💡 <strong>Ayurvedic Perspective:</strong> {currentSeason.overview}
          </p>
        </div>

        {/* ========================================== */}
        {/* 6-CARD GRID OF TIPS */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 animate-fadeIn">
          {currentSeason.tips.map((tip, idx) => (
            <div
              key={idx}
              className="bg-emerald-900/40 border border-emerald-800/80 hover:border-amber-500/50 rounded-2xl p-6 transition-all duration-300 hover:bg-emerald-900/60 shadow-lg flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center gap-3 mb-4 border-b border-emerald-800/60 pb-3">
                  <span className="text-3xl p-2 rounded-xl bg-emerald-950 border border-emerald-800 group-hover:scale-110 transition-transform">
                    {tip.icon}
                  </span>
                  <h4 className="font-serif font-bold text-base text-white group-hover:text-amber-400 transition-colors">
                    {tip.category}
                  </h4>
                </div>

                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-300">
                  {tip.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                      <span className="text-amber-400 font-bold mt-0.5">✔</span>
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
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 border border-emerald-700 rounded-2xl p-6 sm:p-8 text-center max-w-4xl mx-auto shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <h4 className="text-lg sm:text-xl font-serif font-bold text-white mb-1">
              Need a Personalized Seasonal Detox?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300">
              Consult with Dr. Maurya to prepare your body for the changing seasons with customized Panchakarma and herbal tonics.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-emerald-950 font-bold rounded-xl shadow-lg transition-transform hover:scale-105 whitespace-nowrap text-sm flex items-center justify-center gap-2"
          >
            📅 Book Consultation
          </button>
        </div>

      </div>
    </section>
  );
}