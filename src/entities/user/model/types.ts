export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
}

export interface UserBasicInfoResponse {
  status: string;
  message: string;
  data: {
    userEmail: string;
    username: string;
    userProfileUrl: string;
  };
}
