import { GildedRose } from '@/gilded-rose';
import { items } from '@/data';
import { Quality } from '@/quality';
import { Item } from '@/item';

describe('Gilded Rose', () => {
  test('Update quality should return a list of items', () => {
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems).toBeInstanceOf(Array);
    expect(updatedItems[0][0]).toBeInstanceOf(Item);
    expect(updatedItems.length).toBe(10);
    expect(updatedItems.every(([item]) => item instanceof Item)).toBe(true);
    expect(updatedItems[0][0].name).toBe('+5 Dexterity Vest');
  });

  test('Once the sell by date has passed, Quality degrades twice as fast', () => {
    const gildedRose = new GildedRose([[new Item('Expired item', 0, 20), Quality.Normal]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(18);
    expect(updatedItems[0][0].sellIn).toBe(-1);
  });

  test('At the end of each day our system lowers both values for every item', () => {
    const gildedRose = new GildedRose([[new Item('Normal item', 10, 20), Quality.Normal]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(19);
    expect(updatedItems[0][0].sellIn).toBe(9);
  })

  test('The Quality of an item is never negative', () => {
    const gildedRose = new GildedRose([[new Item('LQ item', 10, 0), Quality.Normal]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(0);
    expect(updatedItems[0][0].sellIn).toBe(9);
  });

  test('“Aged Brie” actually increases in Quality the older it gets', () => {
    const gildedRose = new GildedRose([[new Item('Aged Brie', 2, 0), Quality.Aged]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(1);
    expect(updatedItems[0][0].sellIn).toBe(1);
  });

  test('The Quality of an item is never more than 50', () => {
    const gildedRose = new GildedRose([[new Item('Aged Brie', 5, 50), Quality.Aged]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(50);
    expect(updatedItems[0][0].sellIn).toBe(4);
  });

  test('“Sulfuras”, being a legendary item, never has to be sold or decreases in Quality', () => {
    const gildedRose = new GildedRose([[new Item('Sulfuras, Hand of Ragnaros', 0, 80), Quality.Legendary]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(80);
    expect(updatedItems[0][0].sellIn).toBe(0);
  });

  test.each([
    { sellIn: 15, quality: 20, expectedQuality: 21 },
    { sellIn: 10, quality: 29, expectedQuality: 31 },
    { sellIn: 5, quality: 29, expectedQuality: 32 },
    { sellIn: 0, quality: 29, expectedQuality: 0 },
  ])(`“Backstage passes”, like aged brie, increases in Quality as its SellIn value approaches`, ({ sellIn, quality, expectedQuality }) => {
    const gildedRose = new GildedRose([[new Item('Backstage passes to a TAFKAL80ETC concert', sellIn, quality), Quality.BackstagePasses]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(expectedQuality);
    expect(updatedItems[0][0].sellIn).toBe(sellIn - 1);
  });

  test('“Conjured” items degrade in Quality twice as fast as normal items', () => {
    const gildedRose = new GildedRose([[new Item('Conjured Mana Cake', 3, 6), Quality.Conjured]]);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems[0][0].quality).toBe(4);
    expect(updatedItems[0][0].sellIn).toBe(2);
  })

  test('UpdateQuality should not mutate the original items', () => {
    const gildedRose = new GildedRose(items);
    const updatedItems = gildedRose.updateQuality();
    expect(updatedItems).not.toBe(items);
  });

});
