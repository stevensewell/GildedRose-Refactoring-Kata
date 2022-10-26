import { Item } from '@/item';
import { decreaseQuality, increaseQuality } from '@/item-helpers';

export function normalItem(item: Item) {
  return new Item(item.name, item.sellIn - 1, decreaseQuality(item));
}

export function agedItem(item: Item) {
  return new Item(item.name, item.sellIn - 1, increaseQuality(item));
}

export function backstagePassesItem(item: Item): Item {
  switch (true) {
    case item.sellIn <= 0:
      return new Item(item.name, item.sellIn - 1, 0);
    case item.sellIn <= 5:
      return new Item(item.name, item.sellIn - 1, increaseQuality(item, 3));
    case item.sellIn <= 10:
      return new Item(item.name, item.sellIn - 1, increaseQuality(item, 2));
    default:
      return new Item(item.name, item.sellIn - 1, increaseQuality(item));
  }
}

export function conjuredItem(item: Item) {
  return new Item(item.name, item.sellIn - 1, decreaseQuality(item, 2));
}

export function legendaryItem(item: Item) {
  return new Item(item.name, item.sellIn, item.quality);
}