import React, { useState } from 'react';
import { Star, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  text: string;
  stars: number;
  createdAt?: string;
}

const sampleReviews: Review[] = [
  {
    id: 1,
    name: 'Asha, Sitapur',
    text: 'The treatment experience was calm, personal and deeply healing.',
    stars: 5,
    createdAt: '2026-07-01T00:00:00.000Z',
  },
  {
    id: 2,
    name: 'Ravi, Lucknow',
    text: 'The guidance felt natural and effective. I appreciated the care and patience.',
    stars: 5,
    createdAt: '2026-06-20T00:00:00.000Z',
  },
];

export const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(sampleReviews);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const newReview: Review = {
      id: Date.now(),
      name: name.trim(),
      text: text.trim(),
      stars: rating,
      createdAt: new Date().toISOString(),
    };

    setReviews((prev) => [newReview, ...prev].slice(0, 10));
    setSuccessMsg('Thank you! Your feedback has been published.');
    setName('');
    setText('');
    setRating(5);

    setTimeout(() => setSuccessMsg(null), 4000);
    setIsSubmitting(false);
  };

  return (
    <section id="feedback" className="py-20 bg-bg-cream border-t border-accent-gold/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-accent-gold font-bold uppercase tracking-widest text-xs">Patient Testimonials</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-primary-green mt-1">
            Real Healing Experiences
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Submission Form Card */}
          <div className="md:col-span-5 bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-100 sticky top-24">
            <h3 className="font-serif text-xl font-bold text-primary-green mb-2">Share Your Story</h3>
            <p className="text-xs text-gray-500 mb-6">Help others discover natural Ayurvedic healing.</p>
            
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700 text-xs">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700 text-xs animate-fadeIn">
                <CheckCircle2 size={16} className="shrink-0 text-green-600" />
                <span>{successMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className={`p-1 transition cursor-pointer ${star <= rating ? 'text-accent-gold fill-accent-gold scale-110' : 'text-gray-300 hover:text-gray-400'}`}
                    >
                      <Star fill={star <= rating ? "currentColor" : "none"} size={26} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Your Name & Location (e.g., Amit, Sitapur)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm transition"
                />
              </div>

              <div>
                <textarea
                  placeholder="Describe your treatment and how you feel now..."
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-green focus:border-transparent outline-none text-sm resize-none transition"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-accent-gold text-primary-green font-bold py-3 rounded-lg uppercase tracking-wider text-sm hover:brightness-105 active:scale-[0.99] transition shadow-sm disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <span>Submit Testimonial</span>
                )}
              </button>
            </form>
          </div>

          {/* Dynamic Feed (Max 10) */}
          <div className="md:col-span-7 space-y-4 max-h-[550px] overflow-y-auto pr-2">
            {reviews.length === 0 ? (
              <div className="py-16 text-center bg-white rounded-xl border border-gray-100 p-8">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <h4 className="font-serif font-bold text-gray-700 text-base">No Reviews Yet</h4>
                <p className="text-xs text-gray-400 mt-1">Be the first patient to share your healing experience!</p>
              </div>
            ) : (
              reviews.map((rev) => (
                <div key={rev.id} className="bg-white p-6 rounded-xl shadow-xs border border-gray-100 border-l-4 border-l-primary-green hover:shadow-md transition duration-200 animate-fadeIn">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-accent-gold gap-1">
                      {[...Array(rev.stars)].map((_, i) => (
                        <Star key={i} size={16} fill="currentColor" />
                      ))}
                    </div>
                    {rev.createdAt && (
                      <span className="text-[0.7rem] text-gray-400 font-mono">
                        {new Date(rev.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 italic text-sm mb-4 leading-relaxed">"{rev.text}"</p>
                  <div className="flex items-center justify-end gap-2 text-right">
                    <span className="w-6 h-[1px] bg-accent-gold/60 inline-block"></span>
                    <small className="text-primary-green font-bold text-xs">— {rev.name}</small>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  );
};