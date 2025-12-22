import { redirect } from "next/navigation";

export default function UserPage() {
  // user page 접속 시 캘린더 탭으로 이동
  redirect("/user/calendar");
}
