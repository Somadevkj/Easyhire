import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Loader2 } from 'lucide-react';
import { useAuth, UserType } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

export const AuthForm: React.FC = () => {
  const { login, register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLoginType, setSelectedLoginType] = useState<UserType | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    company: '',
    userType: 'candidate' as UserType
  });

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleUserTypeChange = (value: UserType) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password, selectedLoginType!);
      if (success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      }
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await register(
        formData.email, 
        formData.password, 
        formData.name, 
        formData.userType,
        formData.userType === 'recruiter' ? formData.company : undefined
      );
      if (success) {
        toast({
          title: "Account created!",
          description: "Welcome to JobBoard. Your account has been created successfully.",
        });
      }
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "Please try again with different credentials.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-[400px] shadow-elegant border-0 bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Welcome to JobBoard</CardTitle>
        <CardDescription className="text-center">
          Connect with opportunities or find the perfect candidate
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            {!selectedLoginType ? (
              <div className="space-y-4">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Are you a Candidate or Recruiter?
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Please select your role to continue
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2 hover:bg-primary/5"
                    onClick={() => setSelectedLoginType('candidate')}
                  >
                    <span className="font-semibold">Job Seeker</span>
                    <span className="text-xs text-muted-foreground">Looking for opportunities</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="h-16 flex-col gap-2 hover:bg-primary/5"
                    onClick={() => setSelectedLoginType('recruiter')}
                  >
                    <span className="font-semibold">Recruiter</span>
                    <span className="text-xs text-muted-foreground">Hiring talent</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">
                    {selectedLoginType === 'candidate' ? 'Job Seeker Login' : 'Recruiter Login'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedLoginType(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Change
                  </Button>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange('email')}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange('password')}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Login as {selectedLoginType === 'candidate' ? 'Job Seeker' : 'Recruiter'}
                  </Button>
                </form>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Full Name</Label>
                <Input
                  id="register-name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label>I am a...</Label>
                <RadioGroup 
                  value={formData.userType} 
                  onValueChange={handleUserTypeChange}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="candidate" id="candidate-register" />
                    <Label htmlFor="candidate-register">Job Seeker</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="recruiter" id="recruiter-register" />
                    <Label htmlFor="recruiter-register">Recruiter</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {formData.userType === 'recruiter' && (
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange('company')}
                    required
                  />
                </div>
              )}
              
              <Button type="submit" className="w-full" variant="hero" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};