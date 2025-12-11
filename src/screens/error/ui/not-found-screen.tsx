"use client";

import notFoundImage from "@/shared/assets/images/error-images/not-found.svg";
import { useNavigation } from "@/shared/lib/utils/navigation/navigation";
import { ErrorTemplate } from "@/shared/ui/error/error-template";

export function NotFoundScreen() {
  const { navigateToPrev, navigateToHome } = useNavigation();

  return (
    <ErrorTemplate
      imageSrc={notFoundImage}
      title="페이지를 찾을 수 없습니다."
      description={
        <>
          페이지 주소가 잘못 입력되었거나, 주소가 변경 또는 삭제되어
          <br />
          요청하신 페이지를 찾을 수 없습니다.
        </>
      }
      onMainClick={navigateToHome}
      onPrevClick={navigateToPrev}
    />
  );
}
