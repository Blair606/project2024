export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  attempted?: boolean;
  correct?: boolean;
}

export interface Topic {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  questions: Question[];
  lastVisited?: string;
}

export interface Unit {
  id: number;
  code: string;
  name: string;
  instructor: string;
  progress: number;
  nextClass: string;
  resources: { id: number; title: string; type: string; downloadUrl: string; }[];
  assignments: { id: number; title: string; dueDate: string; status: string; }[];
  topics: Topic[];
  lastVisited?: string;
} 