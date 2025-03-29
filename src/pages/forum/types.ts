
export interface DiscussionProps {
  id: number;
  title: string;
  author: string;
  avatar: string;
  date: string;
  views: number;
  replies: number;
  category: string;
  tags: string[];
  pinned?: boolean;
}

export interface NewsItemProps {
  id: number;
  author: string;
  handle: string;
  authorAvatar: string;
  content: string;
  timePosted: string;
  likes: number;
  comments: number;
  shares: number;
  verified: boolean;
  hasImage?: boolean;
  imageUrl?: string;
  category: string;
}
