import { UserProfile } from "../model/types";

export const MOCK_OWN_PROFILE: UserProfile = {
  name: "홍길동",
  email: "hong@example.com",
  rating: 4.8,
  reviewCount: 127,
  // avatarUrl이 없으면 기본 아이콘이 뜸
};

export const MOCK_OTHER_PROFILE: UserProfile = {
  name: "판매왕김씨",
  email: "seller@example.com",
  rating: 4.5,
  reviewCount: 89,
};
