import { Item } from '@/item';

export function increaseQuality(item: Item, rate: number = 1): number {
  return item.quality + rate > 50 ? 50 : item.quality + rate;
}

export function decreaseQuality(item: Item, decrementAmount: number = 1): number {
  return item.sellIn <= 0
         ? item.quality - decrementAmount * 2 < 0 ? 0 : item.quality - decrementAmount * 2
         : item.quality - decrementAmount < 0 ? 0 : item.quality - decrementAmount;
}