
interface ReportMediaProps {
  mediaUrl?: string;
  contentType?: string;
}

export function ReportMedia({ mediaUrl, contentType }: ReportMediaProps) {
  if (!mediaUrl) return null;
  
  return (
    <div className="rounded-md overflow-hidden">
      {contentType?.includes('image') ? (
        <img 
          src={mediaUrl} 
          alt="Reported media" 
          className="w-full object-cover"
        />
      ) : contentType?.includes('video') ? (
        <video 
          src={mediaUrl} 
          controls 
          className="w-full"
        />
      ) : null}
    </div>
  );
}
