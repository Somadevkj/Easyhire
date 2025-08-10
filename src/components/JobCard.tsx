import React from 'react';
import { Job } from '@/types/job';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, DollarSign } from 'lucide-react';
import { useAuth, UserType } from '@/contexts/AuthContext';

interface JobCardProps {
  job: Job;
  onEdit?: (job: Job) => void;
  onDelete?: (jobId: string) => void;
  onApply?: (jobId: string) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onEdit, onDelete, onApply }) => {
  const { user } = useAuth();
  const isRecruiter = user?.type === 'recruiter';
  const isOwner = isRecruiter && user?.id === job.recruiterId;

  const formatSalary = (min: number, max: number, currency: string) => {
    return `${currency}${min.toLocaleString()} - ${currency}${max.toLocaleString()}`;
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  return (
    <Card className="hover:shadow-card transition-smooth bg-gradient-card border-0">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold text-foreground">{job.title}</CardTitle>
            <CardDescription className="text-base font-medium text-primary">{job.company}</CardDescription>
          </div>
          <Badge variant={job.isActive ? "default" : "secondary"}>
            {job.isActive ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {job.location}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {job.type}
            </div>
            <div className="flex items-center gap-1">
              <DollarSign className="h-4 w-4" />
              {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
            </div>
          </div>
          
          <p className="text-sm text-foreground line-clamp-3">{job.description}</p>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            Posted {formatDate(job.postedAt)}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0">
        <div className="flex gap-2 w-full">
          {!isRecruiter && onApply && (
            <Button 
              variant="hero" 
              className="flex-1"
              onClick={() => onApply(job.id)}
            >
              Apply Now
            </Button>
          )}
          
          {isOwner && (
            <>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => onEdit?.(job)}
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                className="flex-1"
                onClick={() => onDelete?.(job.id)}
              >
                Delete
              </Button>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};