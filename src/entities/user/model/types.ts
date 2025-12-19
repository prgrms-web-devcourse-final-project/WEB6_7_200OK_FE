export interface UserProfileType {
  name: string;
  email: string;
  avatarUrl?: string;
  rating: number;
  reviewCount: number;
}

export interface UserBasicInfoResponseType {
  status: string;
  message: string;
  data: {
    userEmail: string;
    username: string;
    userProfileUrl: string;
  };
}
