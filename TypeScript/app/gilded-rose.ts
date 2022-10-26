import { Quality } from '@/quality';
import { Item } from '@/item';
import { agedItem, backstagePassesItem, conjuredItem, legendaryItem, normalItem } from '@/strategies';

export class GildedRose {
  items: Array<[Item, Quality]>;

  constructor(items = [] as Array<[Item, Quality]>) {
    this.items = items;
  }

  updateQuality(): Array<[Item, Quality]> {
    return this.items = this.items.map(([item, quality]) => {
      const newItem = this.handleItem(item, quality);
      return [newItem, quality];
    });
  }

  private handleItem(item: Item, quality: Quality): Item {
    switch (quality) {
      case Quality.Aged:
        return agedItem(item);
      case Quality.BackstagePasses:
        return backstagePassesItem(item);
      case Quality.Conjured:
        return conjuredItem(item);
      case Quality.Legendary:
        return legendaryItem(item);
      default:
        return normalItem(item);
    }
  }
}
