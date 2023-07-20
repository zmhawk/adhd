import { Dayjs } from "dayjs";
import _ from "lodash";

const DB_KEY = "concerta_db";

export type Dose = {
  time: number;
  dose: number;
  comment?: string;
};

export function setLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getLocalStorage(key: string): any {
  return JSON.parse(localStorage.getItem(key) || "");
}

export function readData(): Dose[] {
  return _.sortBy(getLocalStorage(DB_KEY), "time").reverse() as Dose[];
}

export function writeData(data: Dose[]) {
  setLocalStorage(DB_KEY, data);
}

export function addDose(time: Dayjs, dose = 18) {
  const list = readData() || [];
  list.unshift({
    time: time.valueOf(),
    dose,
  });
  writeData(list);
}
