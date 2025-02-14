export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  credits: number;
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  department: string;
  instructor: string;
  status: 'active' | 'inactive';
  enrollmentCapacity: number;
  currentEnrollment: number;
  startDate: string;
  endDate: string;
  schedule: {
    day: string;
    time: string;
    duration: number;
  }[];
  prerequisites: string[];
} 