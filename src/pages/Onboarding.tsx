import { useState } from "react";
import { Mic, Heart, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OnboardingProps {
  onComplete: () => void;
}

const onboardingSlides = [
  {
    icon: Mic,
    title: "Speak Your Mind",
    description: "Transform your thoughts into insights with natural voice journaling. No typing required.",
    color: "text-primary"
  },
  {
    icon: Heart,
    title: "Daily Reflection",
    description: "Build a mindful habit by reflecting on what went well, what could improve, and tomorrow's goals.",
    color: "text-success"
  },
  {
    icon: Target,
    title: "Track Your Growth",
    description: "Watch patterns emerge and celebrate your progress with intelligent insights and searchable memories.",
    color: "text-warning"
  }
];

export const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const currentSlideData = onboardingSlides[currentSlide];
  const IconComponent = currentSlideData.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <h1 className="text-xl font-bold text-primary">Voice Journal</h1>
        <Button 
          variant="ghost" 
          onClick={skipOnboarding}
          className="text-muted-foreground"
        >
          Skip
        </Button>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <Card className="w-full max-w-sm mx-auto journal-card">
          <CardContent className="pt-8 pb-6 text-center space-y-6">
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <IconComponent className={`h-10 w-10 ${currentSlideData.color}`} />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                {currentSlideData.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {currentSlideData.description}
              </p>
            </div>

            {/* Progress indicators */}
            <div className="flex justify-center space-x-2">
              {onboardingSlides.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? 'bg-primary' : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="w-full max-w-sm mx-auto mt-8 space-y-4">
          <Button
            onClick={nextSlide}
            className="w-full tap-target flex items-center justify-center space-x-2"
          >
            <span>
              {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
            </span>
            <ArrowRight className="h-4 w-4" />
          </Button>

          {/* Social login options */}
          {currentSlide === onboardingSlides.length - 1 && (
            <div className="space-y-3">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Sign in with
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full tap-target"
                  onClick={onComplete}
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outline"
                  className="w-full tap-target"
                  onClick={onComplete}
                >
                  Continue with Apple
                </Button>
              </div>
              
              <Button
                variant="ghost"
                className="w-full text-muted-foreground"
                onClick={onComplete}
              >
                Continue with email
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Safe area spacing for bottom */}
      <div className="h-8" />
    </div>
  );
};