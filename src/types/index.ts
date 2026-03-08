// User Roles
export type UserRole = 'student' | 'coordinator' | 'official' | 'admin';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  clubId?: string;
  department?: string;
}

// Club Types
export interface Club {
  id: string;
  name: string;
  description: string;
  logo: string;
  banner?: string;
  coordinator: {
    id: string;
    name: string;
    email: string;
  };
  memberCount: number;
  category: string;
  isApproved: boolean;
  createdAt: string;
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  banner: string;
  date: string;
  time: string;
  venue: string;
  clubId: string;
  clubName: string;
  clubLogo: string;
  isUpcoming: boolean;
  registeredCount?: number;
  needsVolunteers?: boolean;
  resultsPublished?: boolean;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar?: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  type: 'club' | 'official';
}

// Assistance Request Types
export type RequestStatus = 'pending' | 'accepted' | 'completed' | 'rejected';
export type RequestPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface AssistanceRequest {
  id: string;
  title: string;
  description: string;
  officialId: string;
  officialName: string;
  officialDepartment: string;
  targetClubs: string[];
  eventDate: string;
  priority: RequestPriority;
  status: RequestStatus;
  createdAt: string;
}

// Volunteer Types
export interface VolunteerRequest {
  id: string;
  eventId: string;
  eventTitle: string;
  clubId: string;
  clubName: string;
  requiredCount: number;
  appliedCount: number;
  skills: string[];
  deadline: string;
  status: 'open' | 'closed';
}

export interface VolunteerApplication {
  id: string;
  requestId: string;
  studentId: string;
  studentName: string;
  studentAvatar?: string;
  skills: string[];
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

// Collaboration Types
export interface CollaborationInvite {
  id: string;
  fromClubId: string;
  fromClubName: string;
  fromClubLogo: string;
  toClubId: string;
  toClubName: string;
  toClubLogo: string;
  eventTitle: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

// Results Types
export interface EventResult {
  id: string;
  eventId: string;
  eventTitle: string;
  clubName: string;
  publishedAt: string;
  winners: { position: number; name: string; department: string; prize?: string }[];
}

// Activity Log Types
export interface ActivityLog {
  id: string;
  action: string;
  actor: string;
  actorRole: UserRole;
  target: string;
  timestamp: string;
}

// Navigation Types
export interface NavItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles?: UserRole[];
}
