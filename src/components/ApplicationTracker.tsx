import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Bell, Clock, CheckCircle, XCircle, Eye, Calendar } from 'lucide-react';

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  appliedAt: Date;
  status: 'pending' | 'rejected' | 'accepted' | 'interview-scheduled';
  matchPercentage: number;
  priority: 'high' | 'low';
  feedback?: string;
  interviewDate?: Date;
  interviewLocation?: string;
}

const mockApplications: Application[] = [
  {
    id: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    appliedAt: new Date('2024-01-15'),
    status: 'pending',
    matchPercentage: 85,
    priority: 'high',
    feedback: 'Strong technical skills match. Experience with React and TypeScript is excellent.'
  },
  {
    id: '2',
    jobTitle: 'Full Stack Developer',
    company: 'StartupXYZ',
    appliedAt: new Date('2024-01-14'),
    status: 'interview-scheduled',
    matchPercentage: 78,
    priority: 'high',
    interviewDate: new Date('2024-01-20'),
    interviewLocation: '123 Tech Street, Office 5A'
  },
  {
    id: '3',
    jobTitle: 'Junior Developer',
    company: 'DevCompany',
    appliedAt: new Date('2024-01-12'),
    status: 'rejected',
    matchPercentage: 45,
    priority: 'low',
    feedback: 'Unfortunately, we found candidates with more experience for this position.'
  },
  {
    id: '4',
    jobTitle: 'React Developer',
    company: 'WebAgency',
    appliedAt: new Date('2024-01-10'),
    status: 'pending',
    matchPercentage: 65,
    priority: 'low',
    feedback: 'Good React skills but lacks experience with testing frameworks.'
  }
];

export const ApplicationTracker = () => {
  const [applications] = useState<Application[]>(mockApplications);
  const [filter, setFilter] = useState<'all' | 'pending' | 'accepted' | 'rejected' | 'interview-scheduled'>('all');

  const filteredApplications = applications.filter(app => 
    filter === 'all' || app.status === filter
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'accepted':
      case 'interview-scheduled':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'secondary';
      case 'accepted':
      case 'interview-scheduled':
        return 'default';
      case 'rejected':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'default' : 'secondary';
  };

  const getMatchColor = (percentage: number) => {
    if (percentage >= 75) return 'text-green-600';
    if (percentage >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Applications</h1>
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <span className="text-sm text-muted-foreground">
            {applications.filter(app => app.status === 'pending').length} pending applications
          </span>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'interview-scheduled', 'accepted', 'rejected'].map((status) => (
          <Button
            key={status}
            variant={filter === status ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter(status as any)}
            className="capitalize"
          >
            {status === 'all' ? 'All' : status.replace('-', ' ')}
          </Button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredApplications.map((application) => (
          <Card key={application.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{application.jobTitle}</h3>
                    <Badge variant={getStatusColor(application.status)} className="flex items-center gap-1">
                      {getStatusIcon(application.status)}
                      {application.status === 'interview-scheduled' ? 'Interview Scheduled' : application.status}
                    </Badge>
                    <Badge variant={getPriorityColor(application.priority)}>
                      {application.priority} priority
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-3">{application.company}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">Match Score</span>
                        <span className={`text-sm font-bold ${getMatchColor(application.matchPercentage)}`}>
                          {application.matchPercentage}%
                        </span>
                      </div>
                      <Progress value={application.matchPercentage} className="h-2" />
                    </div>

                    {application.feedback && (
                      <div className="bg-muted p-3 rounded-lg">
                        <p className="text-sm">{application.feedback}</p>
                      </div>
                    )}

                    {application.status === 'interview-scheduled' && application.interviewDate && (
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Calendar className="w-4 h-4 text-green-600" />
                          <span className="font-medium text-green-800">Interview Scheduled</span>
                        </div>
                        <p className="text-sm text-green-700">
                          {application.interviewDate.toLocaleDateString()} at {application.interviewDate.toLocaleTimeString()}
                        </p>
                        {application.interviewLocation && (
                          <p className="text-sm text-green-700">Location: {application.interviewLocation}</p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm text-muted-foreground">
                        Applied on {application.appliedAt.toLocaleDateString()}
                      </span>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplications.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No applications found for the selected filter.</p>
        </div>
      )}
    </div>
  );
};