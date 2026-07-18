import React from 'react';
import { Flame, Sparkles, HeartPulse } from 'lucide-react';

export const Services: React.FC = () => {
  const treatments = [
    {
      title: "Agni Karma",
      desc: "An ancient thermal therapy providing instant relief from chronic muscular and joint pain without surgery.",
      tags: ["Sciatica", "Joint Pain"],
      icon: <Flame className="w-10 h-10 text-accent-gold" />
    },
    {
      title: "Panchkarma",
      desc: "A comprehensive five-fold detoxification process to restore balance and boost your natural immunity.",
      tags: ["Detox", "Immunity"],
      icon: <Sparkles className="w-10 h-10 text-accent-gold" />
    },
    {
      title: "Leech Therapy",
      desc: "Natural blood purification using medicinal leeches to treat skin disorders and varicose veins effectively.",
      tags: ["Skin Care", "Varicose"],
      icon: <HeartPulse className="w-10 h-10 text-accent-gold" />
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center font-serif text-3xl sm:text-4xl font-bold text-primary-green mb-16">
          Specialized Treatments
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {treatments.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-bg-cream p-8 rounded-2xl border border-accent-gold/20 flex flex-col justify-between hover:-translate-y-2 hover:bg-white hover:border-accent-gold hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="mb-6">{item.icon}</div>
                <h3 className="font-serif text-2xl font-bold text-primary-green mb-3">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{item.desc}</p>
              </div>
              
              <ul className="flex flex-wrap gap-2 pt-4 border-t border-gray-200/60">
                {item.tags.map((tag, tIdx) => (
                  <li key={tIdx} className="bg-accent-gold/15 text-primary-green px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};