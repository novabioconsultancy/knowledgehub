import type { Article, Event, Contributor, Podcast, Category, CategoryInfo } from '@/types';

export const categories: Record<Category, CategoryInfo> = {
  biotech: {
    id: 'biotech',
    name: 'Biotechnology',
    description: 'Advances in biological research, genetic engineering, and molecular biology',
    color: '#0f5066'
  },
  medtech: {
    id: 'medtech',
    name: 'MedTech',
    description: 'Medical devices, diagnostics, and healthcare technology innovations',
    color: '#2d6a4f'
  },
  'digital-health': {
    id: 'digital-health',
    name: 'Digital Health',
    description: 'Digital solutions transforming healthcare delivery and patient care',
    color: '#6b21a8'
  },
  'ai-healthcare': {
    id: 'ai-healthcare',
    name: 'AI in Healthcare',
    description: 'Artificial intelligence and machine learning applications in medicine',
    color: '#92400e'
  },
  policy: {
    id: 'policy',
    name: 'Policy',
    description: 'Healthcare regulations, ethics, and policy developments',
    color: '#991b1b'
  },
  research: {
    id: 'research',
    name: 'Research',
    description: 'Scientific discoveries, clinical trials, and academic insights',
    color: '#3730a3'
  },
  innovation: {
    id: 'innovation',
    name: 'Innovation',
    description: 'Startups, entrepreneurship, and breakthrough ideas in healthcare',
    color: '#c2410c'
  }
};

export const contributors: Contributor[] = [
  {
    id: '1',
    name: 'Mr. Armustarz Magomere',
    bio: 'CEO Novabio Consultancy with experience in genetic engineering and therapeutic development. Former researcher at KALRO.',
    avatar: 'https://697144220fbe657fd5e5c854.imgix.net/contributor-armustarz.jpg',
    role: 'admin',
    expertise: ['Gene Therapy', 'CRISPR', 'Drug Development'],
    organization: 'NovaBio Consultancy',
    social: { linkedin: 'https://www.linkedin.com/in/armustarz-magomere-513749354/', twitter: '#' },
    articleCount: 24,
    slug: 'mr-armustarz-magomere'
  },
  {
    id: '2',
    name: 'Mr. Ivan Onyunde',
    bio: 'CSO at Novabio Consultancy. Pioneer in medical device innovation with over 5 patents in minimally invasive surgery.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop',
    role: 'contributor',
    expertise: ['MedTech', 'Surgical Robotics', 'Biomedical Engineering'],
    organization: 'Novabio Consultancy',
    social: { linkedin: 'https://www.linkedin.com/in/ivan-onyunde-10a471236/' },
    articleCount: 18,
    slug: 'mr-ivan-onyunde'
  },
  {
    id: '3',
    name: 'Miss. Brenda Karwitha',
    bio: 'Digital health strategist and former Chief Operations Officer at Novabio. Expert in healthcare AI implementation.',
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop',
    role: 'contributor',
    expertise: ['Digital Health', 'AI in Healthcare', 'Health Policy'],
    organization: 'Novabio Consultancy',
    social: { linkedin: 'https://www.linkedin.com/in/brenda-karwitha-133606222/', twitter: '#' },
    articleCount: 12,
    slug: 'miss-brenda-karwitha'
  },
  {
    id: '4',
    name: 'James Park',
    bio: 'Biotech entrepreneur and founder of two successful startups in the diagnostics space. Expert in regulatory pathways and commercialization.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    role: 'contributor',
    expertise: ['Diagnostics', 'Regulatory Affairs', 'Startups'],
    organization: 'BioVenture Labs',
    social: { linkedin: '#' },
    articleCount: 8,
    slug: 'james-park'
  },
  {
    id: '5',
    name: 'Dr. Aisha Patel',
    bio: 'Clinical researcher specializing in oncology trials and precision medicine. Published author with work in Nature and NEJM.',
    avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=200&h=200&fit=crop',
    role: 'contributor',
    expertise: ['Oncology', 'Clinical Trials', 'Precision Medicine'],
    organization: 'Harvard Medical School',
    social: { linkedin: '#', twitter: '#' },
    articleCount: 15,
    slug: 'dr-aisha-patel'
  }
];

export const articles: Article[] = [
  {
    id: '1',
    title: 'CRISPR 3.0: The Next Generation of Gene Editing',
    excerpt: 'Exploring the latest advancements in CRISPR technology, including prime editing and epigenome editing, and their potential to revolutionize therapeutic development.',
    author: contributors[0],
    category: 'biotech',
    tags: ['CRISPR', 'Gene Therapy', 'Therapeutics'],
    featured: true,
    image: '/article-dna.jpg',
    readTime: 8,
    publishedAt: '2026-01-20T10:00:00Z',
    slug: 'crispr-3-0-next-generation'
  },
  {
    id: '2',
    title: 'AI-Powered Diagnostics: From Lab to Clinical Practice',
    excerpt: 'How machine learning algorithms are transforming medical diagnostics, enabling earlier disease detection and personalized treatment pathways.',
    author: contributors[2],
    category: 'ai-healthcare',
    tags: ['AI', 'Diagnostics', 'Machine Learning'],
    featured: true,
    image: '/article-digital.jpg',
    readTime: 6,
    publishedAt: '2026-01-19T14:30:00Z',
    slug: 'ai-powered-diagnostics'
  },
  {
    id: '3',
    title: 'The Rise of Minimally Invasive Surgical Robotics',
    excerpt: 'Examining the latest innovations in surgical robotics and how they are improving patient outcomes while reducing recovery times.',
    author: contributors[1],
    category: 'medtech',
    tags: ['Surgical Robotics', 'MedTech', 'Innovation'],
    featured: false,
    image: '/article-medtech.jpg',
    readTime: 7,
    publishedAt: '2026-01-18T09:15:00Z',
    slug: 'minimally-invasive-surgical-robotics'
  },
  {
    id: '4',
    title: 'Regulatory Pathways for Digital Health Startups',
    excerpt: 'A comprehensive guide to navigating FDA regulations, CE marking, and international compliance for digital health applications.',
    author: contributors[3],
    category: 'policy',
    tags: ['Regulation', 'Startups', 'Digital Health'],
    featured: false,
    image: '/article-startup.jpg',
    readTime: 10,
    publishedAt: '2026-01-17T16:00:00Z',
    slug: 'regulatory-pathways-digital-health'
  },
  {
    id: '5',
    title: 'Breakthroughs in Precision Oncology: Liquid Biopsies',
    excerpt: 'How circulating tumor DNA is changing cancer detection and monitoring, enabling real-time treatment adjustments.',
    author: contributors[4],
    category: 'research',
    tags: ['Oncology', 'Liquid Biopsy', 'Precision Medicine'],
    featured: true,
    image: '/article-microscope.jpg',
    readTime: 9,
    publishedAt: '2026-01-16T11:45:00Z',
    slug: 'precision-oncology-liquid-biopsies'
  },
  {
    id: '6',
    title: 'The Future of Drug Discovery: AI-Driven Compound Design',
    excerpt: 'Exploring how artificial intelligence is accelerating the identification and optimization of novel therapeutic compounds.',
    author: contributors[0],
    category: 'ai-healthcare',
    tags: ['AI', 'Drug Discovery', 'Pharma'],
    featured: false,
    image: '/article-pharma.jpg',
    readTime: 11,
    publishedAt: '2026-01-15T13:20:00Z',
    slug: 'ai-drug-discovery'
  }
];

export const events: Event[] = [
  {
    id: '1',
    title: 'BioInnovation Summit 2026',
    description: 'Join leading experts in biotechnology, MedTech, and digital health for a day of insights, networking, and innovation showcases. Featuring keynote speakers from top healthcare organizations.',
    date: '2026-03-15',
    time: '09:00 AM - 06:00 PM EST',
    location: 'Sajorec Botanical, Jkuat, KE',
    isOnline: false,
    link: 'https://eventbrite.com/bioinnovation-summit',
    speakers: [
      { name: 'Mr. Armustarz Magomere', title: 'Chief Executive Officer', organization: 'NovaBio Consultancy' },
      { name: 'Mr. Ivan Onyunde', title: 'Chief Science Officer', organization: 'NovaBio Consultancy' }
    ],
    image: '/event-conference.jpg',
    category: 'Conference',
    slug: 'bioinnovation-summit-2026'
  },
  {
    id: '2',
    title: 'AI in Healthcare: Regulatory Landscape',
    description: 'A focused webinar on navigating the complex regulatory environment for AI-powered medical devices and applications. Essential for digital health startups and innovators.',
    date: '2026-02-05',
    time: '02:00 PM - 03:30 PM EST',
    location: 'Online via Zoom',
    isOnline: true,
    link: 'https://zoom.us/webinar/ai-healthcare-regulatory',
    speakers: [
      { name: 'Miss. Brenda Karwitha', title: 'Chief Operations Officer', organization: 'Novabio Consultancy' },
      { name: 'James Park', title: 'Regulatory Consultant', organization: 'BioVenture Labs' }
    ],
    image: '/event-webinar.jpg',
    category: 'Webinar',
    slug: 'ai-healthcare-regulatory'
  },
  {
    id: '3',
    title: 'Precision Medicine Workshop',
    description: 'Hands-on workshop covering the latest techniques in precision oncology, including liquid biopsies and personalized treatment planning. Limited to 50 participants.',
    date: '2026-04-22',
    time: '10:00 AM - 04:00 PM PST',
    location: 'UON Campus, Nairobi, KE',
    isOnline: false,
    link: 'https://eventbrite.com/precision-medicine-workshop',
    speakers: [
      { name: 'Dr. Aisha Patel', title: 'Clinical Researcher', organization: 'Harvard Medical School' }
    ],
    image: '/event-conference.jpg',
    category: 'Workshop',
    slug: 'precision-medicine-workshop'
  }
];

export const podcasts: Podcast[] = [
  {
    id: '1',
    title: 'The BioInnovation Podcast Ep. 42',
    description: 'CRISPR Therapies: From Lab to Market with Dr. Jennifer Doudna',
    host: 'Mr. Armustarz Magomere',
    duration: '45 min',
    publishedAt: '2026-01-18T12:00:00Z',
    image: '/podcast-1.jpg',
    slug: 'bioinnovation-podcast-ep42'
  },
  {
    id: '2',
    title: 'Digital Health Disruptors Ep. 15',
    description: 'Building Regulatory-First Digital Health Products',
    host: 'Miss. Brenda Karwitha',
    duration: '38 min',
    publishedAt: '2026-01-15T10:00:00Z',
    image: '/podcast-1.jpg',
    slug: 'digital-health-disruptors-ep15'
  },
  {
    id: '3',
    title: 'The BioInnovation Podcast Ep. 41',
    description: 'The Future of Surgical Robotics',
    host: 'Mr. Ivan Onyunde',
    duration: '52 min',
    publishedAt: '2026-01-10T14:00:00Z',
    image: '/podcast-1.jpg',
    slug: 'bioinnovation-podcast-ep41'
  }
];

export const guidelines = {
  title: 'Publishing Guidelines & Disclaimer',
  lastUpdated: 'January 20, 2026',
  sections: [
    {
      title: 'Content Responsibility',
      content: 'Authors are solely responsible for the content they publish on NovaBio Exchange. This includes ensuring accuracy, proper citations, and compliance with applicable laws and regulations.'
    },
    {
      title: 'Publishing Standards',
      content: 'We encourage thought leadership, research insights, and professional commentary. Content should be original, well-researched, and provide value to the biotechnology and healthcare community.'
    },
    {
      title: 'Prohibited Content',
      content: 'We do not allow content that is defamatory, discriminatory, promotes illegal activities, or contains unsubstantiated medical claims. Commercial promotion should be clearly identified.'
    },
    {
      title: 'Community Guidelines',
      content: 'Engage respectfully with other contributors. Constructive criticism is welcome, but personal attacks and harassment will not be tolerated.'
    }
  ],
  disclaimer: 'The views and opinions expressed in articles on NovaBio Exchange are those of the authors and do not necessarily reflect the official policy or position of NovaBio Consultancy. All content is published "as is" without warranties of any kind.'
};
