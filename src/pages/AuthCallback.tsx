
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Just navigate to home page - Supabase handles the token exchange automatically
    // We're just providing a nicer UX during the callback redirect
    navigate('/', { replace: true });
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader className="h-12 w-12 animate-spin text-fakenik-blue mb-4" />
      <h2 className="text-2xl font-bold mb-2">Completing Login</h2>
      <p className="text-muted-foreground">Please wait while we finish authenticating you...</p>
    </div>
  );
}
