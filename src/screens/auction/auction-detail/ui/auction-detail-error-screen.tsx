"use client";

import ErrorImg from "@/shared/assets/images/error-images/auction-detail-error.svg";
import { useNavigation } from "@/shared/lib/utils/navigation/navigation";
import { ErrorTemplate } from "@/shared/ui";

interface AuctionDetailErrorScreenProps {
  title: string;
  description: string;
}

export default function AuctionDetailErrorScreen({
  title,
  description,
}: AuctionDetailErrorScreenProps) {
  const { navigateToPrev, navigateToHome } = useNavigation();
  return (
    <ErrorTemplate
      imageSrc={ErrorImg}
      title={title}
      description={description}
      onPrevClick={navigateToPrev}
      onMainClick={navigateToHome}
    />
  );
}
