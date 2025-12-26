import { useCallback, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFormState } from "react-hook-form";

import type { ItemCategory, ItemImage } from "@/entities/auction";

import { itemFormSchema, type ItemFormValues } from "./schema";
import { type TimeSelection, type ItemFormSubmitData } from "./types";
import { isFormValid } from "./validators";
import { formatDateTimeDisplay } from "../utils/date-utils";

export function useItemForm() {
  // React Hook Form 설정
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemFormSchema),
    mode: "onBlur",
    defaultValues: {
      productName: "",
      category: "",
      description: "",
      tags: [],
      startPrice: null,
      stopLossPrice: null,
      dropPrice: null,
      selectedDate: null,
      selectedTime: null,
    },
  });

  const { control, watch, setValue, setError, clearErrors, getValues } = form;

  const { errors: formErrors } = useFormState({ control });

  // 검증이 필요한 필드와 화면 표시에 필요한 필드만 구독 (리렌더링 최적화)
  const startPrice = watch("startPrice");
  const stopLossPrice = watch("stopLossPrice");
  const dropPrice = watch("dropPrice");
  const selectedDate = watch("selectedDate");
  const selectedTime = watch("selectedTime");

  // 이미지
  const [images, setImages] = useState<ItemImage[]>([]);

  // 날짜/시간 모달 상태
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState<boolean>(false);

  // 폼 유효성 검증
  const hasFormErrors = Object.keys(formErrors).length > 0;
  const startPriceError = formErrors.startPrice?.message || "";
  const stopLossError = formErrors.stopLossPrice?.message || "";
  const dropPriceError = formErrors.dropPrice?.message || "";

  const formValid =
    !hasFormErrors &&
    images.length > 0 &&
    isFormValid({
      productName: getValues("productName") || "",
      category: getValues("category") || "",
      description: getValues("description") || "",
      startPrice,
      stopLossPrice,
      dropPrice,
      selectedDate,
      startPriceError,
      stopLossError,
      dropPriceError,
    });

  // 날짜/시간 선택 핸들러
  const handleDateTimeConfirm = useCallback(
    (date: Date, time: TimeSelection) => {
      setValue("selectedDate", date);
      setValue("selectedTime", time);
      setIsDateTimeModalOpen(false);
    },
    [setValue]
  );

  const getDisplayText = (): string => {
    if (!selectedDate) {
      return "날짜 및 시간을 선택해주세요";
    }
    return formatDateTimeDisplay(selectedDate, selectedTime);
  };

  // 폼 제출 데이터 생성
  const getSubmitData = (sellerId: string, imageIds: number[]): ItemFormSubmitData | null => {
    if (
      !formValid ||
      !selectedDate ||
      !selectedTime ||
      startPrice === null ||
      stopLossPrice === null ||
      dropPrice === null
    ) {
      return null;
    }

    const values = getValues();

    return {
      sellerId,
      title: values.productName || "",
      description: values.description || "",
      category: values.category as ItemCategory,
      tags: values.tags.map((tag) => ({ name: tag })),
      imageIds,
      startPrice,
      stopLoss: stopLossPrice,
      dropAmount: dropPrice,
      startAt: selectedDate,
    };
  };

  return {
    // React Hook Form
    control,
    setValue,
    getValues,
    watch,

    // State
    startPrice,
    stopLossPrice,
    dropPrice,
    selectedDate,
    selectedTime,
    images,
    startPriceError,
    stopLossError,
    dropPriceError,
    isDateTimeModalOpen,
    formValid,

    // Setters
    setProductName: (value: string) => setValue("productName", value),
    setCategory: (value: string) => setValue("category", value),
    setDescription: (value: string) => setValue("description", value),
    setImages,
    setTags: (value: string[]) => setValue("tags", value),
    setError,
    clearErrors,
    setIsDateTimeModalOpen,

    // Handlers
    handleDateTimeConfirm,
    getDisplayText,
    getSubmitData,
  };
}
