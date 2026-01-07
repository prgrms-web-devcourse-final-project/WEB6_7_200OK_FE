export { UserProfile } from "./ui/user-profile";
export type { UserProfileType } from "./model/types";
export type { UserBasicInfoResponseType } from "./model/types";
export { DASHBOARD_TABS } from "./model/dashboard-tabs.config";
export type { TabIdType, TabConfig } from "./model/types";
export {
  getUserProfile,
  getUserBasic,
  updateUserProfileImage,
  updateUserName,
} from "./api/user-api";
