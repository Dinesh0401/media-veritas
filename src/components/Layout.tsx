
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ChatbotWidget from "./ChatbotWidget";
import { useEffect } from "react";
import { Shield } from "lucide-react";

const Layout = () => {
  // Set favicon dynamically
  useEffect(() => {
    // Create a canvas element
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    
    // Get the rendering context
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Draw the shield icon with glowing effect
      ctx.fillStyle = '#000000';
      ctx.beginPath();
      ctx.arc(32, 32, 30, 0, 2 * Math.PI);
      ctx.fill();
      
      // Draw a shield shape with glow
      ctx.shadowColor = '#0EA5E9';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#0EA5E9';
      ctx.beginPath();
      ctx.moveTo(32, 12);
      ctx.lineTo(20, 18);
      ctx.lineTo(20, 35);
      ctx.quadraticCurveTo(20, 45, 32, 52);
      ctx.quadraticCurveTo(44, 45, 44, 35);
      ctx.lineTo(44, 18);
      ctx.closePath();
      ctx.fill();
      
      // Create a link element for the favicon
      const link = document.querySelector("link[rel~='icon']") as HTMLLinkElement || document.createElement('link');
      link.setAttribute('rel', 'icon');
      link.setAttribute('type', 'image/png');
      link.href = canvas.toDataURL('image/png');
      document.head.appendChild(link);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
};

export default Layout;
