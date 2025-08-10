// JobContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Job } from '@/types/job';

type JobContextType = {
  jobs: Job[];
  setJobs: React.Dispatch<React.SetStateAction<Job[]>>;
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider = ({ children }: { children: ReactNode }) => {
  // Initial mock jobs (can be empty or prefilled)
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: '1',
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'full-time',
      salary: { min: 120000, max: 180000, currency: '$' },
      description: 'We are looking for a skilled Frontend Developer to join our team.',
      requirements: ['React', 'TypeScript', 'Node.js', '5+ years experience'],
      benefits: ['Health Insurance', 'Remote Work', '401k', 'Stock Options'],
      postedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      recruiterId: 'recruiter1',
      isActive: true
    }
  ]);

  return (
    <JobContext.Provider value={{ jobs, setJobs }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error('useJobs must be used within a JobProvider');
  return context;
};
