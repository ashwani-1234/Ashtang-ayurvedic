import { useState } from 'react';

// ==========================================
// DEFAULT STARTER ARTICLES (Pre-loaded!)
// ==========================================
const initialArticles = [
  {
    id: 1,
    title: "Best Ayurvedic Diet for Arthritis (गठिया रोगी क्या खाएं)",
    category: "Joint & Bone Care",
    readTime: "4 min read",
    date: "July 2026",
    excerpt: "Learn how anti-inflammatory foods, warm spices like turmeric and ginger, and avoiding cold/sour foods can naturally reduce joint stiffness and Vata aggravation.",
    content: "Arthritis (Sandhivata) is primarily caused by an aggravation of Vata dosha in the joints. To manage pain naturally, favor warm, freshly cooked meals with healthy fats like cow's ghee. Avoid curd, cold drinks, and nightshades like tomatoes and potatoes which increase inflammation. Daily Abhyanga (warm oil massage) with Mahanarayan oil works wonders alongside a balanced Ayurvedic diet.",
    icon: "🦴"
  },
  {
    id: 2,
    title: "Natural Ways to Improve Digestion (पाचन शक्ति कैसे बढ़ाएं)",
    category: "Digestive Health",
    readTime: "5 min read",
    date: "July 2026",
    excerpt: "Your digestive fire (Agni) is the root of all health. Discover simple daily habits like drinking CCF (Cumin, Coriander, Fennel) tea and eating mindfully.",
    content: "In Ayurveda, weak digestion (Mandagni) leads to the formation of Ama (toxic residue), which is the root cause of chronic diseases. To rekindle your Agni, sip warm water throughout the day, chew your food thoroughly, and avoid eating when stressed. A warm cup of Cumin-Coriander-Fennel (CCF) tea after meals aids digestion without increasing stomach acidity.",
    icon: "🍃"
  },
  {
    id: 3,
    title: "Panchakarma: Benefits & Process (पंचकर्म क्या है और इसके लाभ)",
    category: "Detoxification",
    readTime: "6 min read",
    date: "June 2026",
    excerpt: "Explore the five-fold detoxification process that clears deep-seated toxins, resets your metabolism, and boosts your natural immunity.",
    content: "Panchakarma is not just a massage; it is an intensive clinical detoxification protocol. By using preparatory therapies like Snehana (oleation) and Swedana (herbal steam), deep-seated biological toxins are loosened and eliminated from the body. It is highly effective for chronic skin diseases, joint disorders, and autoimmune imbalances.",
    icon: "🌿"
  },
  {
    id: 4,
    title: "Managing PCOS Naturally with Ayurveda (PCOS का प्राकृतिक समाधान)",
    category: "Women's Health",
    readTime: "5 min read",
    date: "June 2026",
    excerpt: "Understand the Kapha-Vata imbalance behind PCOS and how herbs like Shatavari, Kanchanar Guggulu, and lifestyle changes support hormonal balance.",
    content: "Polycystic Ovary Syndrome (PCOS) involves an imbalance of Kapha and Vata doshas, leading to blocked channels (Srotas) in the reproductive system. Management focuses on clearing Kapha accumulation through daily active exercise, avoiding refined sugars and dairy, and utilizing targeted Ayurvedic herbs under medical supervision to restore regular cycles.",
    icon: "🦋"
  },
  {
    id: 5,
    title: "Top Ayurvedic Herbs for Stress Relief (तनाव मुक्त रहने के आयुर्वेदिक उपाय)",
    category: "Mental Wellness",
    readTime: "4 min read",
    date: "May 2026",
    excerpt: "Discover powerful Medhya Rasayanas (brain tonics) like Ashwagandha, Brahmi, and Shankhpushpi that calm the nervous system and improve sleep.",
    content: "Modern chronic stress overexcites Vata dosha in the nervous system, causing insomnia, anxiety, and mental fatigue. Adaptogenic Ayurvedic herbs like Ashwagandha lower cortisol levels, while Brahmi cools and centers the mind. Pairing these herbs with evening Pranayama (breathing exercises) creates a powerful natural defense against daily stress.",
    icon: "🧠"
  },
  {
    id: 6,
    title: "Seasonal Ayurvedic Wellness Tips (ऋतुचर्या: मौसम के अनुसार स्वास्थ्य)",
    category: "Preventative Care",
    readTime: "3 min read",
    date: "May 2026",
    excerpt: "Align your daily routine (Dinacharya) and diet with the changing seasons to prevent seasonal flu, allergies, and dosha imbalances.",
    content: "Ayurveda teaches that our bodies change with the environment. During the monsoon (Varsha Ritu), digestion naturally weakens, so light, warm, and freshly cooked foods are essential. During winter (Hemanta Ritu), digestive fire is strongest, allowing for nourishing, heavier foods. Adapting your lifestyle to the seasons is the secret to lifelong immunity.",
    icon: "☀️"
  }
];

interface HealthBlogProps {
  onOpenBooking?: () => void;
}

export function HealthBlog({ onOpenBooking }: HealthBlogProps) {
  const [selectedArticle, setSelectedArticle] = useState<typeof initialArticles[0] | null>(null);

  return (
    <section className="py-16 px-4 bg-emerald-950 text-white font-sans border-t border-emerald-900 relative">
      <div className="max-w-6xl mx-auto">
        
        {/* ========================================== */}
        {/* HEADER SECTION */}
        {/* ========================================== */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-emerald-900/80 border border-emerald-700 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-3">
            Dr. Dr. Brahma Prakash Maurya's Wellness Blog
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
            Ayurvedic Health & Lifestyle Insights
          </h2>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
            Explore trusted, holistic health knowledge directly from our clinical experience. Learn how simple adjustments to your diet, herbs, and daily routine can transform your health.
          </p>
        </div>

        {/* ========================================== */}
        {/* ARTICLES GRID */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {initialArticles.map((art) => (
            <div 
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="bg-emerald-900/40 border border-emerald-800/80 rounded-2xl p-6 hover:border-amber-500/60 transition-all duration-300 hover:bg-emerald-900/70 flex flex-col justify-between shadow-lg cursor-pointer group"
            >
              <div>
                {/* Category & Read Time */}
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-3">
                  <span className="bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
                    {art.category}
                  </span>
                  <span className="text-gray-400">{art.readTime}</span>
                </div>

                {/* Article Title */}
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-400 transition-colors mb-2 line-clamp-2">
                  {art.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed line-clamp-3 mb-4">
                  {art.excerpt}
                </p>
              </div>

              {/* Read More Footer */}
              <div className="pt-4 border-t border-emerald-800/60 flex items-center justify-between text-xs font-bold text-amber-400 group-hover:translate-x-1 transition-transform">
                <span>Read Full Article →</span>
                <span className="text-gray-500 text-[11px] font-normal">{art.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* MODAL: FULL ARTICLE READER */}
        {/* ========================================== */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
            <div className="bg-emerald-950 border border-emerald-700 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative text-left">
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-emerald-900 hover:bg-emerald-800 text-gray-300 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <span>{selectedArticle.icon}</span>
                <span>{selectedArticle.category}</span>
                <span>•</span>
                <span className="text-gray-400">{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-serif font-bold text-white mb-4">
                {selectedArticle.title}
              </h2>

              <div className="bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/60 text-xs sm:text-sm text-emerald-200 italic mb-6">
                💡 {selectedArticle.excerpt}
              </div>

              <div className="text-sm sm:text-base text-gray-200 leading-relaxed space-y-4 mb-8">
                <p>{selectedArticle.content}</p>
                <p>
                  <em>Note: Ayurvedic treatments and dietary plans vary according to individual Prakriti (body constitution). For personalized recommendations, please consult with Dr. Maurya.</em>
                </p>
              </div>

              <div className="border-t border-emerald-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-400">
                  Written by <strong className="text-white">Dr. Brahma Prakash Maurya</strong>
                </div>
                
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}