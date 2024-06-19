import { DATE_FORMAT } from "@/constants/common";
import moment from "moment";

export function formatDate(date: Date): string {
  return moment(date).format(DATE_FORMAT);
}
