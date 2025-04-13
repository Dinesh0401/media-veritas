
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Shield, Eye, EyeOff, Loader, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signUp, isLoading, user } = useAuth();
  const [socialAuthError, setSocialAuthError] = useState<string | null>(null);
  const [isSocialLoading, setIsSocialLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signUp(email, password, name);
  };

  const handleSocialAuth = async (provider: 'google' | 'github') => {
    try {
      setIsSocialLoading(true);
      setSocialAuthError(null);
      
      // Using Supabase Auth directly for social providers
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            // Pass the full name as a query param to capture it during the OAuth flow
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      
      if (error) {
        setSocialAuthError(`Error signing in with ${provider}: ${error.message}`);
      }
    } catch (error: any) {
      setSocialAuthError(`An unexpected error occurred: ${error.message}`);
    } finally {
      setIsSocialLoading(false);
    }
  };

  // Clear error on input focus
  const clearError = () => {
    if (socialAuthError) setSocialAuthError(null);
  };

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <Shield className="h-10 w-10 text-fakenik-blue" />
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground">
            Enter your information to get started
          </p>
        </div>

        {socialAuthError && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Authentication Error</AlertTitle>
            <AlertDescription>
              {socialAuthError}
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" onClick={clearError}>
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Password must be at least 8 characters long
            </p>
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox id="terms" className="mt-1" />
            <Label htmlFor="terms" className="text-sm font-normal">
              I agree to the{" "}
              <Link to="/terms" className="text-fakenik-blue hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-fakenik-blue hover:underline">
                Privacy Policy
              </Link>
            </Label>
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
        
        <div className="text-center text-sm">
          <span className="text-muted-foreground">Already have an account?</span>{" "}
          <Link to="/login" className="text-fakenik-blue hover:underline">
            Sign in
          </Link>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => handleSocialAuth('google')} 
            disabled={isSocialLoading || isLoading}
          >
            {isSocialLoading ? (
              <Loader className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C14.7607 19 17.1441 17.3801 18.2968 15H12V12H21.8906C21.9633 12.3235 22 12.6581 22 13C22 18.5228 17.5228 23 12 23C6.47715 23 2 18.5228 2 13C2 7.47715 6.47715 3 12 3C14.9673 3 17.6122 4.30405 19.4149 6.34315L17.2949 8.46315C16.0729 6.97787 14.135 6 12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C14.7165 18 17.0357 16.1649 17.7079 13.6571H12V10.6571H20.8312C20.9425 11.0877 21 11.5368 21 12C21 17.5229 16.9706 22 12 22C7.02944 22 3 17.5229 3 12C3 6.47715 7.02944 2 12 2C15.0554 2 17.7903 3.40202 19.6219 5.58809L17.5045 7.70548C16.1732 5.98375 14.1986 5 12 5Z" fill="currentColor" />
              </svg>
            )}
            Google
          </Button>
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={() => handleSocialAuth('github')} 
            disabled={isSocialLoading || isLoading}
          >
            {isSocialLoading ? (
              <Loader className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            )}
            GitHub
          </Button>
        </div>
        
        <p className="text-xs text-center text-muted-foreground mt-2">
          By using social authentication, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
