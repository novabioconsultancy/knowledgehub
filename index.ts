export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  author: Contributor;
  category: Category;
  tags: string[];
  featured: boolean;
  image: string;
  readTime: number;
  publishedAt: string;
  slug: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  isOnline: boolean;
  link?: string;
  speakers: Speaker[];
  image: string;
  category: string;
  slug: string;
}

export interface Speaker {
  name: string;
  title: string;
  organization: string;
  bio?: string;
}

export interface Contributor {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  role: 'admin' | 'contributor';
  expertise: string[];
  organization?: string;
  social?: {
    linkedin?: string;
    twitter?: string;
  };
  articleCount: number;
  slug: string;
}

export type Category = 
  | 'biotech' 
  | 'medtech' 
  | 'digital-health' 
  | 'ai-healthcare' 
  | 'policy' 
  | 'research' 
  | 'innovation';

export interface CategoryInfo {
  id: Category;
  name: string;
  description: string;
  color: string;
}

export interface Podcast {
  id: string;
  title: string;
  description: string;
  host: string;
  duration: string;
  publishedAt: string;
  image: string;
  audioUrl?: string;
  slug: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'contributor';
  contributorProfile?: Contributor;
}

export interface SubmitArticleForm {
  title: string;
  excerpt: string;
  content: string;
  category: Category;
  tags: string[];
  featured: boolean;
  image?: File;
}
