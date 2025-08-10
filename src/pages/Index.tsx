import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navbar } from '@/components/Navbar';
import { AuthForm } from '@/components/AuthForm';
import { CandidateDashboard } from './CandidateDashboard';
import { RecruiterDashboard } from './RecruiterDashboard';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, Target, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-job-board.jpg';

const Index = () => {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated && user) {
    return (
      <>
        <Navbar />
        {user.type === 'candidate' ? <CandidateDashboard /> : <RecruiterDashboard />}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="h-8 w-8" />
                <h1 className="text-2xl font-bold">JobBoard</h1>
              </div>
              
              <h2 className="text-5xl font-bold mb-6 leading-tight">
                Connect Talent with 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                  Opportunity
                </span>
              </h2>
              
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Whether you're seeking your dream job or the perfect candidate, 
                our platform brings together talent and opportunity in one place.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="border-white bg-white/10 text-white hover:bg-white hover:text-primary">
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <AuthForm />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Why Choose JobBoard?
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform offers powerful tools for both job seekers and recruiters
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-card rounded-lg border shadow-card">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">For Job Seekers</h4>
              <p className="text-muted-foreground leading-relaxed">
                Discover thousands of opportunities from top companies. 
                Apply with one click and track your applications.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-card rounded-lg border shadow-card">
              <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">For Recruiters</h4>
              <p className="text-muted-foreground leading-relaxed">
                Post jobs, manage applications, and find the perfect candidates 
                with our powerful recruitment tools.
              </p>
            </div>
            
            <div className="text-center p-8 bg-gradient-card rounded-lg border shadow-card">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h4 className="text-xl font-semibold text-foreground mb-4">Smart Matching</h4>
              <p className="text-muted-foreground leading-relaxed">
                Our intelligent algorithms help match the right talent 
                with the right opportunities for better outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
