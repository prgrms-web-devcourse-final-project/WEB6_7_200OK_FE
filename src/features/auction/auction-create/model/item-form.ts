import { useCallback, useMemo, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ItemImage } from "@/entities/auction";
import { formatDateTimeDisplay, type TimeSelection } from "@/entities/date-modal";
import { isFormValid } from "@/shared/lib/utils/validator/validators";

import { itemFormSchema, type ItemFormValues } from "./schema";

import type { ItemFormSubmitData } from "./types";

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

  const { control, watch, setValue } = form;

  // React Hook Form에서 가격 값 구독
  const startPrice = watch("startPrice");
  const stopLossPrice = watch("stopLossPrice");
  const dropPrice = watch("dropPrice");

  // 기본 정보 (React Hook Form과 별도로 관리)
  const [productName, setProductName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // 이미지
  // TODO: 이미지 업로드 기능 구현 시, images 제출 로직 추가 필요
  const [images, setImages] = useState<ItemImage[]>([]);

  // 태그
  const [tags, setTags] = useState<string[]>([]);

  // 에러 메시지 관리
  const [startPriceError, setStartPriceError] = useState<string>("");
  const [stopLossError, setStopLossError] = useState<string>("");
  const [dropPriceError, setDropPriceError] = useState<string>("");

  // 날짜/시간
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<TimeSelection | null>(null);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState<boolean>(false);

  // 폼 유효성 검증
  const formValid = useMemo(
    () =>
      isFormValid({
        productName,
        category,
        description,
        startPrice,
        stopLossPrice,
        dropPrice,
        selectedDate,
        startPriceError,
        stopLossError,
        dropPriceError,
      }),
    [
      productName,
      category,
      description,
      startPrice,
      stopLossPrice,
      dropPrice,
      selectedDate,
      startPriceError,
      stopLossError,
      dropPriceError,
    ]
  );

  // 날짜/시간 선택 핸들러
  const handleDateTimeConfirm = useCallback((date: Date, time: TimeSelection) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setIsDateTimeModalOpen(false);
  }, []);

  const getDisplayText = useCallback((): string => {
    if (!selectedDate) {
      return "날짜 및 시간을 선택해주세요";
    }
    return formatDateTimeDisplay(selectedDate, selectedTime);
  }, [selectedDate, selectedTime]);

  // 폼 제출 데이터 생성
  const getSubmitData = useCallback((): ItemFormSubmitData | null => {
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

    return {
      productName,
      category,
      description,
      tags,
      startPrice,
      stopLossPrice,
      dropPrice,
      auctionStartDate: selectedDate,
    };
  }, [
    formValid,
    selectedDate,
    selectedTime,
    productName,
    category,
    description,
    tags,
    startPrice,
    stopLossPrice,
    dropPrice,
  ]);

  return {
    // React Hook Form
    control,
    setValue,

    // State
    productName,
    category,
    description,
    images,
    tags,
    startPrice,
    stopLossPrice,
    dropPrice,
    startPriceError,
    stopLossError,
    dropPriceError,
    selectedDate,
    selectedTime,
    isDateTimeModalOpen,
    formValid,

    // Setters
    setProductName,
    setCategory,
    setDescription,
    setImages,
    setTags,
    setStartPrice: (value: number | null) => setValue("startPrice", value),
    setStopLossPrice: (value: number | null) => setValue("stopLossPrice", value),
    setDropPrice: (value: number | null) => setValue("dropPrice", value),
    setStartPriceError,
    setStopLossError,
    setDropPriceError,
    setSelectedDate,
    setSelectedTime,
    setIsDateTimeModalOpen,

    // Handlers
    handleDateTimeConfirm,
    getDisplayText,
    getSubmitData,
  };
}
