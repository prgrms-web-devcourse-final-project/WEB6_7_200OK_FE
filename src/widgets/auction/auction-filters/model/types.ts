import { CategoryFilter } from "@/entities/auction/model/category";
import { AuctionStatusFilterValueType } from "@/entities/auction/model/status";
import { PriceFilterValue } from "@/widgets/auction/auction-filters/model/constants";

export interface AuctionFiltersType {
  price: PriceFilterValue;
  status: AuctionStatusFilterValueType;
  category: CategoryFilter;
}
