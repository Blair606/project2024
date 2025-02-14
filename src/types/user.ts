export interface BaseUser {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
  nationalId: string;
  phone: string;
  address: string;
}

export interface Guardian {
  name: string;
  relationship: string;
  phone: string;
  email: string;
  occupation: string;
  nationalId: string;
}

export interface Student extends BaseUser {
  role: 'student';
  studentId: string;
  studyLevel: 'certificate' | 'diploma' | 'degree' | 'masters' | 'phd';
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  program: string;
  specialization: string;
  yearOfStudy: number;
  semester: number;
  dateOfBirth: string;
  guardians: Guardian[];
  emergencyContact: string;
}

export interface Teacher extends BaseUser {
  role: 'teacher';
  employeeId: string;
  school: 'SASA' | 'SBE' | 'SED' | 'SEES' | 'SHHS' | 'HSSS' | 'SPAS';
  department: string;
  specialization: string;
  qualifications: string[];
  yearsOfExperience: number;
  subjects: string[];
}

export type User = Student | Teacher; 