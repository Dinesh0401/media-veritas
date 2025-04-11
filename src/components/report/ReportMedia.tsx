
import { useState, useEffect } from 'react';

interface ReportMediaProps {
  mediaUrl?: string;
  contentType?: string;
  images?: string[]; // Add support for multiple images
}

export function ReportMedia({ mediaUrl, contentType, images = [] }: ReportMediaProps) {
  // If images array is provided, use it; otherwise, create an array with the single mediaUrl
  const mediaItems = images?.length > 0 ? images : (mediaUrl ? [mediaUrl] : []);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Only set up the interval if we have multiple items
    if (mediaItems.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [mediaItems.length]);
  
  if (mediaItems.length === 0) return null;
  
  return (
    <div className="rounded-md overflow-hidden relative">
      {mediaItems.map((item, index) => (
        <div 
          key={index}
          className={`transition-opacity duration-500 ${currentIndex === index ? 'opacity-100' : 'opacity-0 absolute top-0 left-0'}`}
        >
          {contentType?.includes('image') ? (
            <img 
              src={item} 
              alt={`Reported media ${index + 1}`}
              className="w-full object-cover"
            />
          ) : contentType?.includes('video') ? (
            <video 
              src={item} 
              controls 
              className="w-full"
            />
          ) : null}
        </div>
      ))}
      
      {/* Add indicators if there are multiple items */}
      {mediaItems.length > 1 && (
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {mediaItems.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
