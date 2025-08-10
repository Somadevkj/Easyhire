export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'freelance';
  salary: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: Date;
  recruiterId: string;
  isActive: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  appliedAt: Date;
  resume?: string;
  coverLetter?: string;
}