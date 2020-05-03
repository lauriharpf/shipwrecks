import dayjs from "dayjs";
import Ship from "./Ship";
import EraOption from "./EraOption";

class Era extends EraOption {
  start: dayjs.Dayjs;
  end: dayjs.Dayjs;

  constructor(id: string, label: string, start: dayjs.Dayjs, end: dayjs.Dayjs) {
    super(id, label);
    this.start = start;
    this.end = end;
  }

  wasSunkDuring(ship: Ship): boolean {
    return (
      !!ship.sunkDate &&
      ship.sunkDate.isBetween(this.start, this.end, null, "[]")
    );
  }
}

export default Era;
