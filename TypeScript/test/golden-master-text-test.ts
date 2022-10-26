import { GildedRose } from '@/gilded-rose';
import { items } from '@/data';
const gildedRose = new GildedRose(items);

let days: number = 2;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");

  items.forEach(([item, quality]) => {
    console.log(item.name + ' ' + item.sellIn + ' ' + item.quality);
  });

  console.log();
  gildedRose.updateQuality();
}
