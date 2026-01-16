import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import SplashScreen from "@/components/SplashScreen";
import Index from "./pages/Index";
import Expenses from "./pages/Expenses";
import GeneralExpenses from "./pages/GeneralExpenses";
import Prayer from "./pages/Prayer";
import Quran from "./pages/Quran";
import Profile from "./pages/Profile";
import Debts from "./pages/Debts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Check if this is the first load in this session
    const hasShownSplash = sessionStorage.getItem('splashShown');
    if (hasShownSplash) {
      setShowSplash(false);
      setIsFirstLoad(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {showSplash && isFirstLoad && (
            <SplashScreen onComplete={handleSplashComplete} />
          )}
          <BrowserRouter>
            <Layout>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/general-expenses" element={<GeneralExpenses />} />
                <Route path="/prayer" element={<Prayer />} />
                <Route path="/quran" element={<Quran />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/debts" element={<Debts />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
};

export default App;
