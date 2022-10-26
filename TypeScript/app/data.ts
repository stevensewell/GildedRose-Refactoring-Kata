import { Quality } from '@/quality';
import { Item } from '@/item';

export const items: Array<[Item, Quality]> = [
  [new Item('+5 Dexterity Vest', 10, 20), Quality.Normal],
  [new Item('LQ item', 10, 0), Quality.Normal],
  [new Item('Aged Brie', 2, 0), Quality.Aged],
  [new Item('Elixir of the Mongoose', 5, 50), Quality.Normal],
  [new Item('Sulfuras, Hand of Ragnaros', 0, 80), Quality.Legendary],
  [new Item('Sulfuras, Hand of Ragnaros', -1, 80), Quality.Legendary],
  [new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20), Quality.BackstagePasses],
  [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49), Quality.BackstagePasses],
  [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49), Quality.BackstagePasses],
  [new Item('Conjured Mana Cake', 3, 6), Quality.Conjured],
];