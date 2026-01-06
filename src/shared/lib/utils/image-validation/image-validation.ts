export const MAX_IMAGE_FILE_SIZE = 50 * 1024 * 1024; // 50MB
export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
];
export const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];

export const isValidImageFile = (file: File): boolean => {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type.toLowerCase())) {
    return false;
  }

  // 이미지 확장자 검증
  const fileName = file.name.toLowerCase();
  const hasValidExtension = ALLOWED_IMAGE_EXTENSIONS.some((ext) => fileName.endsWith(ext));
  if (!hasValidExtension) {
    return false;
  }

  return true;
};

// 이미지 파일 크기 검증
export const isValidFileSize = (file: File, maxSize: number = MAX_IMAGE_FILE_SIZE): boolean =>
  file.size <= maxSize;

export interface ImageValidationResult {
  validFiles: File[];
  invalidTypeFiles: File[];
  oversizedFiles: File[];
}

export const validateImageFiles = (
  files: File[],
  maxSize: number = MAX_IMAGE_FILE_SIZE
): ImageValidationResult => {
  const invalidTypeFiles: File[] = [];
  const oversizedFiles: File[] = [];
  const validFiles: File[] = [];

  files.forEach((file) => {
    if (!isValidImageFile(file)) {
      invalidTypeFiles.push(file);
    } else if (!isValidFileSize(file, maxSize)) {
      oversizedFiles.push(file);
    } else {
      validFiles.push(file);
    }
  });

  return {
    validFiles,
    invalidTypeFiles,
    oversizedFiles,
  };
};
