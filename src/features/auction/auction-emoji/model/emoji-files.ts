import { EmojiType } from "@/entities/auction/model/emoji";
import Fire from "@/shared/assets/images/lottie/fire.json";
import Like from "@/shared/assets/images/lottie/like.json";
import Sad from "@/shared/assets/images/lottie/sad.json";
import Smile from "@/shared/assets/images/lottie/smile.json";

export const EMOJI_RECORD: Record<EmojiType, object | { default: object } | undefined> = {
  FIRE: Fire,
  LIKE: Like,
  SAD: Sad,
  SMILE: Smile,
};
