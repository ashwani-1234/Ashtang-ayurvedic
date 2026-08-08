import { useState } from 'react';
import { Share2 } from 'lucide-react';

interface ShareButtonProps {
  title?: string;
  text?: string;
  url?: string;
  className?: string; // Allows you to add custom Tailwind classes when you use it
}

export function ShareButton({ 
  title = 'Ashtang Ayurveda Clinic', 
  text = 'Book an expert Ayurvedic consultation with Dr. Maurya today!', 
  url, // Will default to the current page URL if not provided
  className = ''
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Determine the URL to share (Defaults to whatever page the user is currently on)
    const shareUrl = url || window.location.href;

    // 1. Check if the device supports Native Web Share (Most mobile phones do)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: shareUrl,
        });
      } catch (error) {
        // User closed the share menu without sharing, which is completely fine.
        console.log('Share menu closed.');
      }
    } 
    // 2. Fallback for Desktop browsers: Copy to clipboard
    else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        // Reset the "Copied!" text back to "Share" after 2 seconds
        setTimeout(() => setCopied(false), 2000); 
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      title={title}
      className={`inline-flex items-center justify-center rounded-full bg-emerald-900/40 hover:bg-amber-500 hover:text-emerald-950 text-white transition-all duration-300 border border-emerald-700/50 shadow-sm ${className}`}
    >
      {copied ? (
        <span className="text-lg">✅</span>
      ) : (
        <Share2 size={18} />
      )}
      <span className="sr-only">Share</span>
    </button>
  );
}