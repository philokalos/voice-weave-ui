import { useState, useEffect } from "react";
import { Recording } from "./Recording";
import { Dashboard } from "./Dashboard";
import { Onboarding } from "./Onboarding";
import { Profile } from "./Profile";

const Index = () => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'dashboard' | 'profile'>('home');

  // Check if user has completed onboarding
  useEffect(() => {
    const completed = localStorage.getItem('voice-journal-onboarding-completed');
    setHasCompletedOnboarding(completed === 'true');
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('voice-journal-onboarding-completed', 'true');
    setHasCompletedOnboarding(true);
  };

  // Show onboarding if not completed
  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Main app based on active tab
  switch (activeTab) {
    case 'dashboard':
      return <Dashboard activeTab={activeTab} onTabChange={setActiveTab} />;
    case 'profile':
      return <Profile activeTab={activeTab} onTabChange={setActiveTab} />;
    default:
      return <Recording activeTab={activeTab} onTabChange={setActiveTab} />;
  }
};

export default Index;
