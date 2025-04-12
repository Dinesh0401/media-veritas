
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
  onFileChange: (file: File | null) => void;
  maxSizeMB?: number;
}

export default function ImageUploader({ onFileChange, maxSizeMB = 5 }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndProcessFile(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      validateAndProcessFile(e.target.files[0]);
    }
  };
  
  const validateAndProcessFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (convert maxSizeMB to bytes)
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      alert(`File is too large. Maximum size is ${maxSizeMB}MB.`);
      return;
    }
    
    onFileChange(file);
  };
  
  const triggerFileInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  
  return (
    <div
      className={cn(
        "w-full h-full min-h-[200px] rounded-md border-2 border-dashed transition-colors flex flex-col items-center justify-center cursor-pointer p-4",
        isDragging ? "border-fakenik-blue bg-fakenik-blue/5" : "border-border hover:border-fakenik-blue/50 hover:bg-muted/30"
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={triggerFileInput}
    >
      <input 
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileInput}
      />
      
      <Upload className={cn(
        "h-10 w-10 mb-4 transition-colors",
        isDragging ? "text-fakenik-blue" : "text-muted-foreground"
      )} />
      
      <div className="text-center">
        <p className="font-medium">
          {isDragging ? "Drop image here" : "Drag and drop image"}
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          or click to browse files
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Supported formats: JPEG, PNG, GIF (max {maxSizeMB}MB)
        </p>
      </div>
    </div>
  );
}
