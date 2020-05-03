import Ship from "./Ship";

class EraOption {
  id: string;
  label: string;

  constructor(id: string, label: string) {
    this.id = id;
    this.label = label;
  }

  wasSunkDuring(ship: Ship): boolean {
    return ship.sunkDate === null;
  }
}

export default EraOption;
