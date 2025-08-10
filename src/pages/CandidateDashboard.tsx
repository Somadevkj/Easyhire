import React, { useState, useEffect } from 'react';
import { Job } from '@/types/job';
import { JobCard } from '@/components/JobCard';
import { ApplicationTracker } from '@/components/ApplicationTracker';
import { ProfileSetup } from '@/components/ProfileSetup';
import { NotificationSystem } from '@/components/NotificationSystem';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, MapPin, Briefcase, User, Bell, FileText } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Mock data
const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'full-time',
    salary: { min: 120000, max: 180000, currency: '$' },
    description: 'We are looking for a skilled Frontend Developer to join our team and help build amazing user experiences. You will work with React, TypeScript, and modern development tools.',
    requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
    benefits: ['Health Insurance', 'Remote Work', '401k', 'Stock Options'],
    postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    recruiterId: 'recruiter1',
    isActive: true
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    type: 'full-time',
    salary: { min: 80000, max: 120000, currency: '$' },
    description: 'Join our creative team to design beautiful and intuitive user interfaces. You will work closely with developers and product managers.',
    requirements: ['Figma', 'Adobe Creative Suite', 'User Research', '3+ years experience'],
    benefits: ['Health Insurance', 'Flexible Hours', 'Creative Freedom'],
    postedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    recruiterId: 'recruiter2',
    isActive: true
  },
  {
    id: '3',
    title: 'Data Scientist',
    company: 'Analytics Pro',
    location: 'Austin, TX',
    type: 'contract',
    salary: { min: 90000, max: 140000, currency: '$' },
    description: 'Analyze complex datasets and build machine learning models to drive business insights and decision making.',
    requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
    benefits: ['Flexible Schedule', 'Learning Budget', 'Remote Options'],
    postedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    recruiterId: 'recruiter3',
    isActive: true
  }
];

export const CandidateDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(mockJobs);

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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Browse Jobs
            </TabsTrigger>
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              My Applications
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="jobs" className="mt-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-2">Available Jobs</h2>
              <p className="text-muted-foreground">Discover your next career opportunity</p>
            </div>

            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search jobs, companies, or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {jobTypes.map((type) => (
                  <Button
                    key={type.value}
                    variant={selectedJobType === type.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedJobType(type.value)}
                  >
                    {type.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Job Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-card p-6 rounded-lg border shadow-card">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{filteredJobs.length}</p>
                    <p className="text-sm text-muted-foreground">Available Jobs</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-card p-6 rounded-lg border shadow-card">
                <div className="flex items-center gap-3">
                  <MapPin className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {new Set(filteredJobs.map(job => job.location)).size}
                    </p>
                    <p className="text-sm text-muted-foreground">Locations</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-card p-6 rounded-lg border shadow-card">
                <div className="flex items-center gap-3">
                  <Filter className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">
                      {new Set(filteredJobs.map(job => job.company)).size}
                    </p>
                    <p className="text-sm text-muted-foreground">Companies</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            {filteredJobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground">Try adjusting your search criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    job={job}
                    onApply={handleApply}
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