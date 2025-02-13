export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'teacher' | 'student';
  status: 'active' | 'inactive';
}

class UserService {
  async getAllUsers(): Promise<User[]> {
    // Implement API call
    return [];
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return { id: 'temp-id', ...user };
  }

  async updateUser(id: string, user: Partial<User>): Promise<User> {
    return { id, ...user } as User;
  }

  async deleteUser(id: string): Promise<void> {
    console.log(`Would delete user ${id}`);
  }
}

export const userService = new UserService(); 