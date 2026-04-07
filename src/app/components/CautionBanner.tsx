import { AlertCircle } from 'lucide-react';
import React from 'react';

export function CautionBanner() {
  return (
    <div className="bg-amber-100 border-b border-amber-200 text-amber-900 py-2.5 px-4 overflow-hidden relative z-40 w-full flex items-center">
      <style>{`
        @keyframes customMarquee {
          0% { transform: translateX(10%); }
          100% { transform: translateX(-100%); }
        }
        .animate-custom-marquee {
          display: inline-flex;
          white-space: nowrap;
          animation: customMarquee 45s linear infinite;
        }
        .animate-custom-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
      
      <div className="w-full overflow-hidden flex items-center">
        <div className="animate-custom-marquee">
          {/* We repeat the message twice for a continuous loop effect */}
          {[1, 2, 3].map((i) => (
            <span key={i} className="flex items-center text-[14px] sm:text-sm font-semibold pr-16 min-w-max">
              <AlertCircle className="w-4 h-4 mr-2 shrink-0 text-amber-600" />
              <span>
                PLEASE READ THE MENU ITEM DESCRIPTION CAREFULLY BEFORE PLACING AN ORDER!  {"  "} There is no refund on negligence, and the vendor/logistics will not be responsible for any expectation mistakes made.
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
