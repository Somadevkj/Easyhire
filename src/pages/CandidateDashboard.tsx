import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { JobCard } from '@/components/JobCard';
import { ApplicationTracker } from '@/components/ApplicationTracker';
import { ProfileSetup } from '@/components/ProfileSetup';
import { NotificationSystem } from '@/components/NotificationSystem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, MapPin, Briefcase, User, Bell, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useJobs } from './JobContext';

export const CandidateDashboard: React.FC = () => {
  const { jobs } = useJobs();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobs);

  useEffect(() => {
    let filtered = jobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedJobType !== 'all') {
      filtered = filtered.filter(job => job.type === selectedJobType);
    }

    setFilteredJobs(filtered);
  }, [jobs, searchTerm, selectedJobType]);

  const handleApply = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    toast({
      title: "Application Submitted!",
      description: `Your application for ${job?.title} at ${job?.company} has been submitted successfully.`,
    });
  };

  const jobTypes = [
    { value: 'all', label: 'All Jobs' },
    { value: 'full-time', label: 'Full Time' },
    { value: 'part-time', label: 'Part Time' },
    { value: 'contract', label: 'Contract' },
    { value: 'freelance', label: 'Freelance' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Candidate Dashboard</h1>
            <p className="text-muted-foreground">Manage your job search and applications</p>
          </div>
          <NotificationSystem />
        </div>

        <Tabs defaultValue="jobs" className="w-full">
          <TabsList className="flex w-full justify-around">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Listings
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-6">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <Input
                type="search"
                placeholder="Search by title, company, location"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <select
                value={selectedJobType}
                onChange={e => setSelectedJobType(e.target.value)}
                className="border rounded px-3 py-2"
              >
                {jobTypes.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            {/* Job Listings */}
            {filteredJobs.length === 0 ? (
              <p className="text-muted-foreground text-center py-12">No jobs match your search criteria.</p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={() => handleApply(job.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="applications" className="mt-6">
            <ApplicationTracker />
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <ProfileSetup />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
