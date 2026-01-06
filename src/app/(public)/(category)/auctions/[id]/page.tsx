import type { Metadata } from "next";

import { cookies } from "next/headers";

import { AuctionDetailScreen } from "@/screens/auction/auction-detail";
import { auctionDetailLoader } from "@/screens/auction/auction-detail/api/loader";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const { data } = await auctionDetailLoader(id);

    const title = `${data.title} | Windfall`;
    const description =
      data.description?.slice(0, 120) ?? `${data.title} 경매 상세 정보를 확인하세요.`;

    const ogImage = data.imageUrls[0] || undefined;

    return {
      title,
      description,
      alternates: {
        canonical: `/auction/${id}`,
      },
      openGraph: {
        title,
        description,
        type: "website",
        url: `/auction/${id}`,
        images: ogImage ? [{ url: ogImage }] : undefined,
      },
      twitter: {
        card: ogImage ? "summary_large_image" : "summary",
        title,
        description,
        images: ogImage ? [ogImage] : undefined,
      },
    };
  } catch {
    return {
      title: "경매 상세 | Windfall",
      description: "경매 상세 정보를 확인하세요.",
    };
  }
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await auctionDetailLoader(id);
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  return <AuctionDetailScreen data={data} id={id} token={accessToken} />;
}
