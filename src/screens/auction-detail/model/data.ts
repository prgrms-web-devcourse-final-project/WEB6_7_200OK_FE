interface PageDataType {
  id: number;
  images: ImageType[];
}

interface ImageType {
  src: string;
  id: string;
}

export const PAGE_DATA: PageDataType = {
  id: 1,
  images: [
    { id: "1", src: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400" },
    { id: "2", src: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400" },
    { id: "3", src: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400" },
    { id: "4", src: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" },
  ],
};
