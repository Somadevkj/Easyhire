import React, { useState } from 'react';
import { Job } from '@/types/job';
import { JobCard } from '@/components/JobCard';
import { ApplicationInbox } from '@/components/ApplicationInbox';
import { ProfileSetup } from '@/components/ProfileSetup';
import { NotificationSystem } from '@/components/NotificationSystem';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Briefcase, Users, Eye, Inbox, User, Building2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

// Mock data for recruiter's jobs
const mockRecruiterJobs: Job[] = [{
  id: '1',
  title: 'Senior Frontend Developer',
  company: 'TechCorp Inc.',
  location: 'San Francisco, CA',
  type: 'full-time',
  salary: {
    min: 120000,
    max: 180000,
    currency: '$'
  },
  description: 'We are looking for a skilled Frontend Developer to join our team.',
  requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
  benefits: ['Health Insurance', 'Remote Work', '401k', 'Stock Options'],
  postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  recruiterId: 'current-user',
  isActive: true
}];
export const RecruiterDashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const [jobs, setJobs] = useState<Job[]>(mockRecruiterJobs);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    type: 'full-time' as Job['type'],
    salaryMin: '',
    salaryMax: '',
    description: '',
    requirements: '',
    benefits: ''
  });
  const resetForm = () => {
    setFormData({
      title: '',
      location: '',
      type: 'full-time',
      salaryMin: '',
      salaryMax: '',
      description: '',
      requirements: '',
      benefits: ''
    });
    setEditingJob(null);
  };
  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };
  const handleSelectChange = (value: Job['type']) => {
    setFormData(prev => ({
      ...prev,
      type: value
    }));
  };
  const handleCreateJob = () => {
    const newJob: Job = {
      id: Math.random().toString(36).substr(2, 9),
      title: formData.title,
      company: user?.company || 'Your Company',
      location: formData.location,
      type: formData.type,
      salary: {
        min: parseInt(formData.salaryMin),
        max: parseInt(formData.salaryMax),
        currency: '$'
      },
      description: formData.description,
      requirements: formData.requirements.split(',').map(r => r.trim()),
      benefits: formData.benefits.split(',').map(b => b.trim()),
      postedAt: new Date(),
      recruiterId: user?.id || '',
      isActive: true
    };
    setJobs(prev => [newJob, ...prev]);
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: "Job Created!",
      description: "Your job listing has been created successfully."
    });
  };
  const handleEditJob = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      location: job.location,
      type: job.type,
      salaryMin: job.salary.min.toString(),
      salaryMax: job.salary.max.toString(),
      description: job.description,
      requirements: job.requirements.join(', '),
      benefits: job.benefits.join(', ')
    });
    setIsCreateDialogOpen(true);
  };
  const handleUpdateJob = () => {
    if (!editingJob) return;
    const updatedJob: Job = {
      ...editingJob,
      title: formData.title,
      location: formData.location,
      type: formData.type,
      salary: {
        min: parseInt(formData.salaryMin),
        max: parseInt(formData.salaryMax),
        currency: '$'
      },
      description: formData.description,
      requirements: formData.requirements.split(',').map(r => r.trim()),
      benefits: formData.benefits.split(',').map(b => b.trim())
    };
    setJobs(prev => prev.map(job => job.id === editingJob.id ? updatedJob : job));
    setIsCreateDialogOpen(false);
    resetForm();
    toast({
      title: "Job Updated!",
      description: "Your job listing has been updated successfully."
    });
  };
  const handleDeleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
    toast({
      title: "Job Deleted!",
      description: "The job listing has been removed."
    });
  };
  const totalApplications = jobs.reduce((acc, job) => acc + Math.floor(Math.random() * 20), 0);
  return <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Recruiter Dashboard</h1>
            <p className="text-muted-foreground">Manage your recruitment process</p>
          </div>
          <NotificationSystem />
        </div>

        <Tabs defaultValue="applications" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications" className="flex items-center gap-2">
              <Inbox className="w-4 h-4" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="jobs" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Management
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2 text-left">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            
          </TabsList>

          <TabsContent value="applications" className="mt-6">
            <ApplicationInbox />
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <div className="mb-8">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">Job Management</h2>
                  <p className="text-muted-foreground">Manage your job listings and track applications</p>
                </div>
                
                <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setIsCreateDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Job
                    </Button>
                  </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingJob ? 'Edit Job Listing' : 'Create New Job Listing'}</DialogTitle>
                <DialogDescription>
                  {editingJob ? 'Update your job listing details' : 'Fill in the details to create a new job listing'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Job Title</Label>
                  <Input id="title" value={formData.title} onChange={handleInputChange('title')} placeholder="e.g. Senior Frontend Developer" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={formData.location} onChange={handleInputChange('location')} placeholder="e.g. San Francisco, CA" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="type">Job Type</Label>
                    <Select value={formData.type} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="full-time">Full Time</SelectItem>
                        <SelectItem value="part-time">Part Time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="salaryMin">Min Salary ($)</Label>
                    <Input id="salaryMin" type="number" value={formData.salaryMin} onChange={handleInputChange('salaryMin')} placeholder="80000" />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="salaryMax">Max Salary ($)</Label>
                    <Input id="salaryMax" type="number" value={formData.salaryMax} onChange={handleInputChange('salaryMax')} placeholder="120000" />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="description">Job Description</Label>
                  <Textarea id="description" value={formData.description} onChange={handleInputChange('description')} placeholder="Describe the role, responsibilities, and what you're looking for..." rows={4} />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="requirements">Requirements (comma-separated)</Label>
                  <Textarea id="requirements" value={formData.requirements} onChange={handleInputChange('requirements')} placeholder="React, TypeScript, 3+ years experience, etc." rows={3} />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="benefits">Benefits (comma-separated)</Label>
                  <Textarea id="benefits" value={formData.benefits} onChange={handleInputChange('benefits')} placeholder="Health insurance, Remote work, 401k, etc." rows={3} />
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => {
                      setIsCreateDialogOpen(false);
                      resetForm();
                    }}>
                  Cancel
                </Button>
                <Button onClick={editingJob ? handleUpdateJob : handleCreateJob}>
                  {editingJob ? 'Update Job' : 'Create Job'}
                </Button>
              </DialogFooter>
                </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-card p-6 rounded-lg border shadow-card">
                <div className="flex items-center gap-3">
                  <Briefcase className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{jobs.length}</p>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-card p-6 rounded-lg border shadow-card">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-accent" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{totalApplications}</p>
                    <p className="text-sm text-muted-foreground">Total Applications</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-card p-6 rounded-lg border shadow-card">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">{jobs.length * 150}</p>
                    <p className="text-sm text-muted-foreground">Profile Views</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Job Listings */}
            {jobs.length === 0 ? <div className="text-center py-12">
                <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No job listings yet</h3>
                <p className="text-muted-foreground mb-4">Create your first job listing to start attracting candidates</p>
                <Button onClick={() => setIsCreateDialogOpen(true)}>
                  <Plus className="h-4 h-4 mr-2" />
                  Create Your First Job
                </Button>
              </div> : <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {jobs.map(job => <JobCard key={job.id} job={job} onEdit={handleEditJob} onDelete={handleDeleteJob} />)}
              </div>}
          </TabsContent>

          <TabsContent value="profile" className="mt-6">
            <ProfileSetup />
          </TabsContent>

          <TabsContent value="company" className="mt-6">
            <ProfileSetup />
          </TabsContent>
        </Tabs>
      </div>
    </div>;
};