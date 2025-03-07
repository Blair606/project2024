export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'student' | 'teacher' | 'admin' | 'parent';
  // ... other user properties
}

export interface Course {
  id: string;
  code: string;
  title: string;
  // ... other course properties
}

// Add other interfaces 