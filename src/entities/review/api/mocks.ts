import { ReviewType } from "../model/types";

export const MOCK_REVIEWS: ReviewType[] = [
  {
    id: "r1",
    reviewer: {
      name: "박민수",
    },
    date: "2025/12/08",
    rating: 5,
    content:
      "정말 좋은 상품이었어요! 설명대로 깨끗한 상태였고, 배송도 빨랐습니다. 판매자분도 친절하셔서 기분 좋은 거래였습니다. 다음에 또 거래하고 싶어요.",
    product: {
      name: "맥북 프로 14인치 M2",
      imageUrl: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=400",
    },
  },
  {
    id: "r2",
    reviewer: {
      name: "김수진",
    },
    date: "2025/12/12",
    rating: 4,
    content: "전반적으로 만족스러운 거래였습니다. 상품 상태도 좋고 가격도 합리적이었어요.",
    product: {
      name: "로지텍 MX Master 3S",
      imageUrl: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
    },
  },
  {
    id: "r3",
    reviewer: {
      name: "이준호",
    },
    date: "2025/12/05",
    rating: 5,
    content:
      "완벽한 상태의 제품이었습니다! 박스부터 구성품까지 하나도 빠짐없이 완벽했어요. 판매자님 정말 감사합니다!",
    product: {
      name: "LG 울트라기어 모니터",
      imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
    },
  },
  {
    id: "r4",
    reviewer: {
      name: "최유리",
    },
    date: "2025/12/15",
    rating: 3,
    content:
      "상품은 괜찮았지만 설명보다는 사용감이 조금 더 있었어요. 그래도 가격을 생각하면 적당한 것 같습니다.",
    product: {
      name: "애플 에어팟 맥스",
      imageUrl: "https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=400",
    },
  },
  {
    id: "r5",
    reviewer: {
      name: "정민호",
    },
    date: "2025/12/18",
    rating: 5,
    content: "빠른 배송과 꼼꼼한 포장 감사합니다. 제품 상태도 새것처럼 깨끗하네요!",
    product: {
      name: "소니 WH-1000XM5",
      imageUrl: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400",
    },
  },
  {
    id: "r6",
    reviewer: {
      name: "강서연",
    },
    date: "2025/12/20",
    rating: 4,
    content: "좋은 가격에 구매했어요. 약간의 스크래치가 있었지만 사전에 말씀해주셔서 괜찮았습니다.",
    product: {
      name: "아이패드 에어 5세대",
      imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    },
  },
];
