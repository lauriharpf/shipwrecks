import dayjs from "dayjs";
import { Era, EraOption } from "../Ship.types";

const startOfJSTime = dayjs(new Date(-8640000000000000));

const eras = [
  new Era("PRE_WW_I", "Pre-WW I", startOfJSTime, dayjs("1914-07-27")),
  new Era("WW_I", "WW I", dayjs("1914-07-28"), dayjs("1918-11-11")),
  new Era("INTERWAR", "Interwar", dayjs("1918-11-12"), dayjs("1939-08-31")),
  new Era("WW_II", "WW II", dayjs("1939-09-01"), dayjs("1945-09-02")),
  new Era("POSTWAR", "Postwar", dayjs("1945-09-03"), dayjs()),
  new EraOption("UNKNOWN", "No sunk date"),
];

export default eras;
