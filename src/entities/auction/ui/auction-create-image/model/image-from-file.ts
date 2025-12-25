export interface ItemImage {
  id: string;
  url: string;
  file?: File;
}

export const MAX_IMAGES = 10;

export const itemImageFromFile = (file: File): Promise<ItemImage> =>
  new Promise((resolve, reject) => {
    if (!file.type.startsWith("image/")) {
      reject(new Error("Invalid file type"));
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const imageId = crypto.randomUUID();
      resolve({
        id: imageId,
        url: reader.result as string,
        file,
      });
    };
    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };
    reader.readAsDataURL(file);
  });
