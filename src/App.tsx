
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Report from "./pages/Report";
import Track from "./pages/Track";
import Forum from "./pages/forum"; // Updated import path
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ReportDetails from "./pages/ReportDetails";
import VerifyReport from "./pages/VerifyReport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/report" element={
                <ProtectedRoute>
                  <Report />
                </ProtectedRoute>
              } />
              <Route path="/track" element={
                <ProtectedRoute>
                  <Track />
                </ProtectedRoute>
              } />
              <Route path="/report-details/:id" element={
                <ProtectedRoute>
                  <ReportDetails />
                </ProtectedRoute>
              } />
              <Route path="/verify" element={<VerifyReport />} />
              <Route path="/forum" element={<Forum />} />
              <Route path="/about" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
