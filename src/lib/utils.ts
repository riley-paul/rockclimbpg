import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getIsActiveUrl = (url: string, pathname: string) => {
  if (url === "/") return pathname === "/";
  return pathname.startsWith(url);
};