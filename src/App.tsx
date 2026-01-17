import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import AuthScreen from './screens/AuthScreen';
import OTPScreen from './screens/OTPScreen';
import ProfileSetupScreen from './screens/ProfileSetupScreen';
import QuizScreen from './screens/QuizScreen';
import DashboardScreen from './screens/DashboardScreen';
import CalendarScreen from './screens/CalendarScreen';
import CentersScreen from './screens/CentersScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import AccountDetailScreen from './screens/AccountDetailScreen';
import BookingScreen from './screens/BookingScreen';
import BottomNavigation from './components/BottomNavigation';
import { Toaster } from './components/ui/toaster';

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleOnboardingComplete = () => {
    setIsOnboarded(true);
  };

  const handleAuthComplete = () => {
    setIsAuthenticated(true);
  };

  const handleProfileComplete = () => {
    setHasProfile(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasProfile(false);
    setIsOnboarded(false);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {!isOnboarded && (
            <Route 
              path="/onboarding" 
              element={<OnboardingScreen onComplete={handleOnboardingComplete} />} 
            />
          )}
          
          {!isAuthenticated && (
            <>
              <Route 
                path="/auth" 
                element={<AuthScreen onComplete={handleAuthComplete} />} 
              />
              <Route 
                path="/otp" 
                element={<OTPScreen onComplete={handleAuthComplete} />} 
              />
            </>
          )}
          
          {isAuthenticated && !hasProfile && (
            <Route 
              path="/profile-setup" 
              element={<ProfileSetupScreen onComplete={handleProfileComplete} />} 
            />
          )}
          
          {isAuthenticated && hasProfile && (
            <>
              <Route path="/quiz" element={<QuizScreen />} />
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/calendar" element={<CalendarScreen />} />
              <Route path="/centers" element={<CentersScreen />} />
              <Route path="/chat" element={<ChatScreen />} />
              <Route path="/profile" element={<ProfileScreen onLogout={handleLogout} />} />
              <Route path="/account-detail" element={<AccountDetailScreen />} />
              <Route path="/booking" element={<BookingScreen />} />
            </>
          )}
          
          <Route 
            path="*" 
            element={
              <Navigate 
                to={
                  !isOnboarded 
                    ? "/onboarding" 
                    : !isAuthenticated 
                    ? "/auth" 
                    : !hasProfile 
                    ? "/profile-setup" 
                    : "/dashboard"
                } 
                replace 
              />
            } 
          />
        </Routes>
        
        {isAuthenticated && hasProfile && <BottomNavigation />}
        <Toaster />
      </div>
    </Router>
  );
}

export default App;
