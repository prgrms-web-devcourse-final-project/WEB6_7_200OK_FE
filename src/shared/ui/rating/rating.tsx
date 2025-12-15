"use client";

import type { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from "react";
import {
  Children,
  cloneElement,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { type LucideProps, StarIcon } from "lucide-react";

import { cn } from "@/shared/lib/utils/utils";

interface RatingContextValue {
  value: number;
  readOnly: boolean;
  hoverValue: number | null;
  focusedStar: number | null;
  handleValueChange: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    value: number
  ) => void;
  handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
  setHoverValue: (value: number | null) => void;
  setFocusedStar: (value: number | null) => void;
}

const RatingContext = createContext<RatingContextValue | null>(null);

const useRating = () => {
  const context = useContext(RatingContext);
  if (!context) {
    throw new Error("useRating must be used within a Rating component");
  }
  return context;
};

export type RatingButtonProps = LucideProps & {
  index?: number;
  icon?: ReactElement<LucideProps>;
};

export function RatingButton({
  index: providedIndex,
  size = 20,
  className,
  icon = <StarIcon />,
}: RatingButtonProps) {
  const {
    value,
    readOnly,
    hoverValue,
    focusedStar,
    handleValueChange,
    handleKeyDown,
    setHoverValue,
    setFocusedStar,
  } = useRating();

  const index = providedIndex ?? 0;

  // [수정] 0.5 단위 별점 로직 추가
  // 현재 표시할 값 결정 (hover 우선, 그 다음 focus, 마지막으로 실제 값)
  const displayValue = hoverValue ?? focusedStar ?? value ?? 0;

  // 현재 별이 얼마나 채워져야 하는지 계산 (0 ~ 1 사이의 값)
  // 예: displayValue가 3.5일 때
  // index 0, 1, 2는 (3.5 - n) >= 1 이므로 1 (100%)
  // index 3은 (3.5 - 3) = 0.5 이므로 0.5 (50%)
  // index 4는 (3.5 - 4) < 0 이므로 0 (0%)
  const fillRatio = Math.max(0, Math.min(1, displayValue - index));
  const isPartiallyActive = fillRatio > 0;

  let tabIndex = -1;

  if (!readOnly) {
    // 탭 포커스 로직: 현재 값에 해당하는 별, 혹은 값이 없으면 첫 번째 별에 포커스
    if (Math.ceil(value) === index + 1) {
      tabIndex = 0;
    } else if (value === 0 && index === 0) {
      tabIndex = 0;
    }
  }

  // [수정] 마우스 위치에 따른 0.5점 단위 값 계산 함수
  const calculateValue = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      // 버튼의 절반보다 왼쪽이면 0.5점, 오른쪽이면 1점으로 계산
      return x < rect.width / 2 ? index + 0.5 : index + 1;
    },
    [index]
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      const newValue = calculateValue(event);
      handleValueChange(event, newValue);
    },
    [calculateValue, handleValueChange]
  );

  const handleMouseEnter = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!readOnly) {
        const newValue = calculateValue(event);
        setHoverValue(newValue);
      }
    },
    [readOnly, calculateValue, setHoverValue]
  );

  // [추가] 마우스 이동 시 실시간으로 0.5 단위 업데이트
  const handleMouseMove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (!readOnly) {
        const newValue = calculateValue(event);
        // 불필요한 렌더링 방지를 위해 값이 다를 때만 업데이트
        if (newValue !== hoverValue) {
          setHoverValue(newValue);
        }
      }
    },
    [readOnly, calculateValue, hoverValue, setHoverValue]
  );

  const handleFocus = useCallback(() => {
    setFocusedStar(index + 1);
  }, [setFocusedStar, index]);

  const handleBlur = useCallback(() => {
    setFocusedStar(null);
  }, [setFocusedStar]);

  return (
    <button
      // [수정] data-state를 통해 스타일링 (0.5점이라도 있으면 active 상태로 간주하여 노란색 텍스트 적용)
      data-state={isPartiallyActive ? "active" : "inactive"}
      className={cn(
        "focus-visible:ring-ring relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "p-0.5",
        readOnly && "cursor-default",
        className
      )}
      disabled={readOnly}
      onBlur={handleBlur}
      onClick={handleClick}
      onFocus={handleFocus}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove} // MouseMove 이벤트 추가
      tabIndex={tabIndex}
      type="button"
    >
      {/* [수정] 아이콘 레이어링 (배경 아이콘 + 채워지는 아이콘) */}
      <div className="relative" style={{ width: size, height: size }}>
        {/* 1. 배경 아이콘 (외곽선) */}
        <div className="absolute inset-0">
          {cloneElement(icon, {
            size,
            // fill-transparent를 강제하여 배경색이 채워지지 않고 외곽선만 보이도록 함
            className: cn(
              "transition-colors duration-200 fill-transparent",
              !readOnly && "cursor-pointer"
            ),
            "aria-hidden": "true",
          })}
        </div>

        {/* 2. 전경 아이콘 (채워짐) - width로 클리핑하여 0.5 단위 표현 */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillRatio * 100}%` }}>
          {cloneElement(icon, {
            size,
            // fill-current를 사용하여 부모(button)의 텍스트 색상(노란색 등)을 따라감
            className: cn(
              "transition-colors duration-200 fill-current",
              !readOnly && "cursor-pointer"
            ),
            "aria-hidden": "true",
          })}
        </div>
      </div>
    </button>
  );
}

export interface RatingProps {
  defaultValue?: number;
  value?: number;
  onChange?: (
    event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
    value: number
  ) => void;
  onValueChange?: (value: number) => void;
  readOnly?: boolean;
  className?: string;
  children?: ReactNode;
}

export function Rating({
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  defaultValue = 0,
  onChange,
  readOnly = false,
  className,
  children,
  ...props
}: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [focusedStar, setFocusedStar] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [value, onValueChange] = useControllableState({
    defaultProp: defaultValue,
    prop: controlledValue,
    onChange: controlledOnValueChange,
  });

  const handleValueChange = useCallback(
    (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>, newValue: number) => {
      if (!readOnly) {
        onChange?.(event, newValue);
        onValueChange?.(newValue);
      }
    },
    [readOnly, onChange, onValueChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (readOnly) {
        return;
      }

      const total = Children.count(children);
      let newValue = focusedStar !== null ? focusedStar : (value ?? 0);

      switch (event.key) {
        case "ArrowRight":
          if (event.shiftKey || event.metaKey) {
            newValue = total;
          } else {
            // 키보드 조작 시 1점 단위 이동 유지 (필요시 0.5로 변경 가능)
            newValue = Math.min(total, newValue + 1);
          }
          break;
        case "ArrowLeft":
          if (event.shiftKey || event.metaKey) {
            newValue = 1;
          } else {
            newValue = Math.max(1, newValue - 1);
          }
          break;
        default:
          return;
      }

      event.preventDefault();
      setFocusedStar(newValue);
      handleValueChange(event, newValue);
    },
    [focusedStar, value, children, readOnly, handleValueChange]
  );

  useEffect(() => {
    if (focusedStar !== null && containerRef.current) {
      const buttons = containerRef.current.querySelectorAll("button");
      // focus logic simplifies to integer indexing, might need adjustment if rigorous focus mgmt needed
      const focusIndex = Math.max(0, Math.ceil(focusedStar) - 1);
      buttons[focusIndex]?.focus();
    }
  }, [focusedStar]);

  const contextValue: RatingContextValue = useMemo(
    () => ({
      value: value ?? 0,
      readOnly,
      hoverValue,
      focusedStar,
      handleValueChange,
      handleKeyDown,
      setHoverValue,
      setFocusedStar,
    }),
    [
      value,
      readOnly,
      hoverValue,
      focusedStar,
      handleValueChange,
      handleKeyDown,
      setHoverValue,
      setFocusedStar,
    ]
  );
  return (
    <RatingContext.Provider value={contextValue}>
      <div
        aria-label="Rating"
        className={cn("inline-flex items-center gap-0.5", className)}
        onMouseLeave={() => setHoverValue(null)}
        ref={containerRef}
        role="radiogroup"
        tabIndex={-1}
        {...props}
      >
        {Children.map(children, (child, index) => {
          if (!child) {
            return null;
          }

          return cloneElement(child as ReactElement<RatingButtonProps>, {
            index,
          });
        })}
      </div>
    </RatingContext.Provider>
  );
}

// "use client";

// import type { KeyboardEvent, MouseEvent, ReactElement, ReactNode } from "react";
// import {
//   Children,
//   cloneElement,
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
//   useMemo,
// } from "react";

// import { useControllableState } from "@radix-ui/react-use-controllable-state";
// import { type LucideProps, StarIcon } from "lucide-react";

// import { cn } from "@/shared/lib/utils/utils";

// interface RatingContextValue {
//   value: number;
//   readOnly: boolean;
//   hoverValue: number | null;
//   focusedStar: number | null;
//   handleValueChange: (
//     event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
//     value: number
//   ) => void;
//   handleKeyDown: (event: KeyboardEvent<HTMLButtonElement>) => void;
//   setHoverValue: (value: number | null) => void;
//   setFocusedStar: (value: number | null) => void;
// }

// const RatingContext = createContext<RatingContextValue | null>(null);

// const useRating = () => {
//   const context = useContext(RatingContext);
//   if (!context) {
//     throw new Error("useRating must be used within a Rating component");
//   }
//   return context;
// };

// export type RatingButtonProps = LucideProps & {
//   index?: number;
//   icon?: ReactElement<LucideProps>;
// };

// export function RatingButton({
//   index: providedIndex,
//   size = 20,
//   className,
//   icon = <StarIcon />,
// }: RatingButtonProps) {
//   const {
//     value,
//     readOnly,
//     hoverValue,
//     focusedStar,
//     handleValueChange,
//     handleKeyDown,
//     setHoverValue,
//     setFocusedStar,
//   } = useRating();

//   const index = providedIndex ?? 0;
//   const isActive = index < (hoverValue ?? focusedStar ?? value ?? 0);
//   let tabIndex = -1;

//   if (!readOnly) {
//     tabIndex = value === index + 1 ? 0 : -1;
//   }

//   const handleClick = useCallback(
//     (event: MouseEvent<HTMLButtonElement>) => {
//       handleValueChange(event, index + 1);
//     },
//     [handleValueChange, index]
//   );

//   const handleMouseEnter = useCallback(() => {
//     if (!readOnly) {
//       setHoverValue(index + 1);
//     }
//   }, [readOnly, setHoverValue, index]);

//   const handleFocus = useCallback(() => {
//     setFocusedStar(index + 1);
//   }, [setFocusedStar, index]);

//   const handleBlur = useCallback(() => {
//     setFocusedStar(null);
//   }, [setFocusedStar]);

//   return (
//     <button
//       className={cn(
//         "focus-visible:ring-ring rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
//         "p-0.5",
//         readOnly && "cursor-default",
//         className
//       )}
//       disabled={readOnly}
//       onBlur={handleBlur}
//       onClick={handleClick}
//       onFocus={handleFocus}
//       onKeyDown={handleKeyDown}
//       onMouseEnter={handleMouseEnter}
//       tabIndex={tabIndex}
//       type="button"
//     >
//       {cloneElement(icon, {
//         size,
//         className: cn(
//           "transition-colors duration-200",
//           isActive && "fill-current",
//           !readOnly && "cursor-pointer"
//         ),
//         "aria-hidden": "true",
//       })}
//     </button>
//   );
// }

// export interface RatingProps {
//   defaultValue?: number;
//   value?: number;
//   onChange?: (
//     event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
//     value: number
//   ) => void;
//   onValueChange?: (value: number) => void;
//   readOnly?: boolean;
//   className?: string;
//   children?: ReactNode;
// }

// export function Rating({
//   value: controlledValue,
//   onValueChange: controlledOnValueChange,
//   defaultValue = 0,
//   onChange,
//   readOnly = false,
//   className,
//   children,
//   ...props
// }: RatingProps) {
//   const [hoverValue, setHoverValue] = useState<number | null>(null);
//   const [focusedStar, setFocusedStar] = useState<number | null>(null);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const [value, onValueChange] = useControllableState({
//     defaultProp: defaultValue,
//     prop: controlledValue,
//     onChange: controlledOnValueChange,
//   });

//   const handleValueChange = useCallback(
//     (event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>, newValue: number) => {
//       if (!readOnly) {
//         onChange?.(event, newValue);
//         onValueChange?.(newValue);
//       }
//     },
//     [readOnly, onChange, onValueChange]
//   );

//   const handleKeyDown = useCallback(
//     (event: KeyboardEvent<HTMLButtonElement>) => {
//       if (readOnly) {
//         return;
//       }

//       const total = Children.count(children);
//       let newValue = focusedStar !== null ? focusedStar : (value ?? 0);

//       switch (event.key) {
//         case "ArrowRight":
//           if (event.shiftKey || event.metaKey) {
//             newValue = total;
//           } else {
//             newValue = Math.min(total, newValue + 1);
//           }
//           break;
//         case "ArrowLeft":
//           if (event.shiftKey || event.metaKey) {
//             newValue = 1;
//           } else {
//             newValue = Math.max(1, newValue - 1);
//           }
//           break;
//         default:
//           return;
//       }

//       event.preventDefault();
//       setFocusedStar(newValue);
//       handleValueChange(event, newValue);
//     },
//     [focusedStar, value, children, readOnly, handleValueChange]
//   );

//   useEffect(() => {
//     if (focusedStar !== null && containerRef.current) {
//       const buttons = containerRef.current.querySelectorAll("button");
//       buttons[focusedStar - 1]?.focus();
//     }
//   }, [focusedStar]);

//   const contextValue: RatingContextValue = useMemo(
//     () => ({
//       value: value ?? 0,
//       readOnly,
//       hoverValue,
//       focusedStar,
//       handleValueChange,
//       handleKeyDown,
//       setHoverValue,
//       setFocusedStar,
//     }),
//     [
//       value,
//       readOnly,
//       hoverValue,
//       focusedStar,
//       handleValueChange,
//       handleKeyDown,
//       setHoverValue,
//       setFocusedStar,
//     ]
//   );
//   return (
//     <RatingContext.Provider value={contextValue}>
//       <div
//         aria-label="Rating"
//         className={cn("inline-flex items-center gap-0.5", className)}
//         onMouseLeave={() => setHoverValue(null)}
//         ref={containerRef}
//         role="radiogroup"
//         tabIndex={-1}
//         {...props}
//       >
//         {Children.map(children, (child, index) => {
//           if (!child) {
//             return null;
//           }

//           return cloneElement(child as ReactElement<RatingButtonProps>, {
//             index,
//           });
//         })}
//       </div>
//     </RatingContext.Provider>
//   );
// }
