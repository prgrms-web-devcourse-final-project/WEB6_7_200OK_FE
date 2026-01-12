import {
  Calendar,
  Clock,
  DollarSign,
  Package,
  Shield,
  TrendingDown,
  Zap,
  type LucideIcon,
} from "lucide-react";

export interface Keyword {
  icon: LucideIcon;
  label: string;
  description: string;
}

export const KEYWORDS: Keyword[] = [
  { icon: Clock, label: "시간", description: "시간이 흐르면서" },
  { icon: TrendingDown, label: "가격 하락", description: "가격이 점점 낮아지고" },
  { icon: Zap, label: "선점", description: "먼저 구매하는 사람이 승리" },
];

export interface PricePoint {
  time: string;
  price: number;
  label?: string;
}

export const priceData: PricePoint[] = [
  { time: "00:00", price: 100000, label: "시작" },
  { time: "00:05", price: 95000 },
  { time: "00:10", price: 90000, label: "구매 완료" },
];

export interface ChatMessage {
  id: number;
  text: string;
  type: "thinking" | "waiting" | "success";
}

export const messages: ChatMessage[] = [
  { id: 1, text: "지금 사야 하나...?", type: "thinking" },
  { id: 2, text: "조금만 더 기다려볼까?", type: "thinking" },
  { id: 3, text: "다른 사람이 먼저 사면 어떡하지", type: "waiting" },
  { id: 4, text: "지금이다! 구매 완료!", type: "success" },
];

export const priceSteps = [
  { time: "00:05", price: 90000 },
  { time: "00:10", price: 85000 },
  { time: "00:15", price: 80000 },
];

export interface Step {
  id: number;
  icon: LucideIcon;
  label: string;
  placeholder: string;
  description: string;
}

export const steps: Step[] = [
  {
    id: 1,
    icon: Package,
    label: "상품명",
    placeholder: "예: 프리미엄 무선 이어폰",
    description: "판매할 상품의 이름을 입력하세요",
  },
  {
    id: 2,
    icon: DollarSign,
    label: "시작 가격",
    placeholder: "예: 100,000",
    description: "경매가 시작되는 가격을 설정하세요",
  },
  {
    id: 3,
    icon: TrendingDown,
    label: "가격 하락 단위",
    placeholder: "예: 5,000",
    description: "5분마다 하락할 금액을 설정하세요",
  },
  {
    id: 4,
    icon: Shield,
    label: "Stop Loss",
    placeholder: "예: 50,000",
    description: "최대 하락 가격을 설정하세요",
  },
  {
    id: 5,
    icon: Calendar,
    label: "경매 시작 일정",
    placeholder: "예: 2026-01-15 14:00",
    description: "경매 시작 시간을 설정하세요",
  },
];

export const guideImages = {
  liveAuction:
    "https://images.unsplash.com/photo-1762553159827-7a5d2167b55d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlbGVzcyUyMGVhcmJ1ZHMlMjBwcmVtaXVtfGVufDF8fHx8MTc2Nzk2NDY2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  upcomingAuction:
    "https://images.unsplash.com/photo-1745256375848-1d599594635d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbWFydCUyMHdhdGNoJTIwbW9kZXJufGVufDF8fHx8MTc2ODA2NjgzMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
};
