import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { User, Download, Calendar, Clock, TrendingUp, TrendingDown, Eye, CheckCircle, XCircle, Mail, Phone, MapPin } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  appliedAt: Date;
  matchPercentage: number;
  priority: 'high' | 'low';
  skills: string[];
  experience: string;
  education: string;
  strengths: string[];
  weaknesses: string[];
  pros: string[];
  cons: string[];
  cvUrl: string;
}

const mockCandidates: Candidate[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    jobTitle: 'Senior Frontend Developer',
    appliedAt: new Date('2024-01-15'),
    matchPercentage: 85,
    priority: 'high',
    skills: ['React', 'TypeScript', 'Node.js', 'GraphQL'],
    experience: '5+ years in frontend development with expertise in React ecosystem',
    education: 'BS Computer Science, MIT',
    strengths: ['Strong React skills', 'TypeScript expert', 'Team leadership'],
    weaknesses: ['Limited backend experience', 'No DevOps knowledge'],
    pros: ['Excellent communication', 'Quick learner', 'Problem solver'],
    cons: ['Salary expectations high', 'Notice period 2 months'],
    cvUrl: '/mock-cv.pdf'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 (555) 987-6543',
    location: 'San Francisco, CA',
    jobTitle: 'Senior Frontend Developer',
    appliedAt: new Date('2024-01-14'),
    matchPercentage: 78,
    priority: 'high',
    skills: ['React', 'Vue.js', 'JavaScript', 'CSS3'],
    experience: '4 years in frontend development, strong design background',
    education: 'BA Computer Science, Stanford',
    strengths: ['UI/UX skills', 'Multi-framework experience', 'Creative thinking'],
    weaknesses: ['Less TypeScript experience', 'New to testing'],
    pros: ['Design mindset', 'Adaptable', 'Great portfolio'],
    cons: ['Switching frameworks often', 'Remote only'],
    cvUrl: '/mock-cv.pdf'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@email.com',
    phone: '+1 (555) 456-7890',
    location: 'Austin, TX',
    jobTitle: 'Senior Frontend Developer',
    appliedAt: new Date('2024-01-12'),
    matchPercentage: 65,
    priority: 'low',
    skills: ['React', 'JavaScript', 'HTML5', 'CSS3'],
    experience: '3 years in web development, transitioning from backend',
    education: 'MS Software Engineering, UT Austin',
    strengths: ['Full-stack knowledge', 'Database skills', 'System thinking'],
    weaknesses: ['Limited React experience', 'No TypeScript'],
    pros: ['Backend knowledge valuable', 'Local candidate', 'Eager to learn'],
    cons: ['Junior in frontend', 'Career transition risk'],
    cvUrl: '/mock-cv.pdf'
  }
];

export const ApplicationInbox = () => {
  const [candidates] = useState<Candidate[]>(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isSchedulingInterview, setIsSchedulingInterview] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    date: '',
    time: '',
    location: '',
    notes: ''
  });

  const handleAccept = (candidateId: string) => {
    setIsSchedulingInterview(true);
    console.log('Accepting candidate:', candidateId);
  };

  const handleReject = (candidateId: string) => {
    console.log('Rejecting candidate:', candidateId);
    // Mock: Remove from list and notify candidate
  };

  const handleScheduleInterview = () => {
    console.log('Scheduling interview:', interviewDetails);
    setIsSchedulingInterview(false);
    setInterviewDetails({ date: '', time: '', location: '', notes: '' });
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'default' : 'secondary';
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Application Inbox</h1>
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="text-green-600">
            {candidates.filter(c => c.priority === 'high').length} High Priority
          </Badge>
          <Badge variant="outline" className="text-yellow-600">
            {candidates.filter(c => c.priority === 'low').length} Low Priority
          </Badge>
        </div>
      </div>

      <div className="grid gap-4">
        {candidates.map((candidate) => (
          <Card key={candidate.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">{candidate.name}</h3>
                    </div>
                    <Badge variant={getPriorityColor(candidate.priority)}>
                      {candidate.priority} priority
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="w-4 h-4" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="w-4 h-4" />
                      {candidate.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {candidate.location}
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Match Score</span>
                      <span className={`text-sm font-bold ${getMatchColor(candidate.matchPercentage)}`}>
                        {candidate.matchPercentage}%
                      </span>
                    </div>
                    <Progress value={candidate.matchPercentage} className="h-2" />
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {candidate.skills.slice(0, 4).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                    {candidate.skills.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{candidate.skills.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      Applied on {candidate.appliedAt.toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedCandidate(candidate)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Candidate Details - {selectedCandidate?.name}</DialogTitle>
                          </DialogHeader>
                          {selectedCandidate && (
                            <div className="space-y-6">
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    Strengths
                                  </h4>
                                  <ul className="space-y-1">
                                    {selectedCandidate.strengths.map((strength, index) => (
                                      <li key={index} className="text-sm text-green-700">• {strength}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                    Areas for Improvement
                                  </h4>
                                  <ul className="space-y-1">
                                    {selectedCandidate.weaknesses.map((weakness, index) => (
                                      <li key={index} className="text-sm text-red-700">• {weakness}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h4 className="font-semibold mb-2 text-green-600">Pros</h4>
                                  <ul className="space-y-1">
                                    {selectedCandidate.pros.map((pro, index) => (
                                      <li key={index} className="text-sm">• {pro}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2 text-red-600">Cons</h4>
                                  <ul className="space-y-1">
                                    {selectedCandidate.cons.map((con, index) => (
                                      <li key={index} className="text-sm">• {con}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Experience</h4>
                                <p className="text-sm text-muted-foreground">{selectedCandidate.experience}</p>
                              </div>

                              <div>
                                <h4 className="font-semibold mb-2">Education</h4>
                                <p className="text-sm text-muted-foreground">{selectedCandidate.education}</p>
                              </div>

                              <div className="flex gap-2">
                                <Button variant="outline" className="flex-1">
                                  <Download className="w-4 h-4 mr-2" />
                                  Download CV
                                </Button>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(candidate.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reject
                      </Button>

                      <Button
                        size="sm"
                        onClick={() => handleAccept(candidate.id)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isSchedulingInterview} onOpenChange={setIsSchedulingInterview}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Schedule Interview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={interviewDetails.date}
                  onChange={(e) => setInterviewDetails(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Input
                  id="time"
                  type="time"
                  value={interviewDetails.time}
                  onChange={(e) => setInterviewDetails(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Office address or video call link"
                value={interviewDetails.location}
                onChange={(e) => setInterviewDetails(prev => ({ ...prev, location: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information for the candidate..."
                value={interviewDetails.notes}
                onChange={(e) => setInterviewDetails(prev => ({ ...prev, notes: e.target.value }))}
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsSchedulingInterview(false)}>
                Cancel
              </Button>
              <Button onClick={handleScheduleInterview}>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Interview
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {candidates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No applications found.</p>
        </div>
      )}
    </div>
  );
};