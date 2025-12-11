"use client";

import { useEffect } from "react";

import errorImage from "@/shared/assets/images/error-images/error.svg";
import { useNavigation } from "@/shared/lib/utils/navigation/navigation";
import { ErrorTemplate } from "@/shared/ui/error/error-template";

interface ErrorScreenProps {
  error: Error;
}

export function ErrorScreen({ error }: ErrorScreenProps) {
  const { navigateToPrev, navigateToHome } = useNavigation();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorTemplate
      imageSrc={errorImage}
      title="알 수 없는 에러 발생"
      description={
        <>
          알 수 없는 에러가 발생하여
          <br />
          요청하신 페이지를 찾을 수 없습니다.
        </>
      }
      onMainClick={navigateToHome}
      onPrevClick={navigateToPrev}
    />
  );
}
