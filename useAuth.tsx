import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Contributor } from '@/types';

interface AuthContextType {
  user: User | null;
  contributor: Contributor | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, name: string, password: string, contributorData?: Partial<Contributor>) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users
const demoUsers: User[] = [
  {
    id: '1',
    email: 'admin@novabio.com',
    name: 'NovaBio Admin',
    role: 'admin',
    contributorProfile: {
      id: '1',
      name: 'Mr. Armustarz Magomere',
      bio: 'CEO at Novabio Consultancy with experience in genetic engineering and therapeutic development.',
      avatar: 'https://697144220fbe657fd5e5c854.imgix.net/contributor-armustarz.jpg',
      role: 'admin',
      expertise: ['Gene Therapy', 'CRISPR'],
      organization: 'NovaBio Consultancy',
      articleCount: 24,
      slug: 'mr-armustarz-magomere'
    }
  },
  {
    id: '2',
    email: 'contributor@example.com',
    name: 'Ivan Onyunde',
    role: 'contributor',
    contributorProfile: {
      id: '2',
      name: 'Mr. Ivan Onyunde',
      bio: 'CSO at Novabio Consultancy.',
      avatar: 'https://697144220fbe657fd5e5c854.imgix.net/contributor-ivan%20(2).jpg',
      role: 'contributor',
      expertise: ['MedTech', 'Surgical Robotics'],
      organization: 'NovaBio Consultancy',
      articleCount: 18,
      slug: 'mr-ivan-onyunde'
    }
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = demoUsers.find(u => u.email === email);
    if (foundUser && password === 'demo123') {
      setUser(foundUser);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  }, []);

  const register = useCallback(async (
    email: string, 
    name: string, 
    _password: string,
    contributorData?: Partial<Contributor>
  ): Promise<boolean> => {
    setLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'contributor',
      contributorProfile: {
        id: Date.now().toString(),
        name: contributorData?.name || name,
        bio: contributorData?.bio || 'New contributor',
        avatar: contributorData?.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop',
        role: 'contributor',
        expertise: contributorData?.expertise || [],
        organization: contributorData?.organization,
        articleCount: 0,
        slug: name.toLowerCase().replace(/\s+/g, '-')
      }
    };
    
    setUser(newUser);
    setLoading(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const contributor = user?.contributorProfile || null;
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{
      user,
      contributor,
      login,
      register,
      logout,
      isAuthenticated,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
