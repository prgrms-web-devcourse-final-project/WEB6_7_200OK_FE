import imageCompression from "browser-image-compression";

export async function compressImage(file: File): Promise<File> {
  const MAX_SIZE_MB = 2;
  const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

  if (file.size <= MAX_SIZE_BYTES) {
    return file;
  }

  const options = {
    maxSizeMB: MAX_SIZE_MB, // 최대 2MB
    maxWidthOrHeight: 1920, // 최대 너비/높이
    useWebWorker: true, // Web Worker 사용으로 성능 향상
    fileType: file.type, // 원본 파일 타입 유지
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch {
    return file;
  }
}

export async function compressImages(files: File[]): Promise<File[]> {
  return Promise.all(files.map((file) => compressImage(file)));
}
