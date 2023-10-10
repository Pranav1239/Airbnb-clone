import Env from "@/config/Env";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function imageMbTobytes(bytes: number): number {
  const MB = 1048576;
  return bytes / MB;
}

export function generateRandomNumber(): number {
  const min = 2000;
  const max = 20000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function ImageUrl(image: string): string {
  return `${Env.SUPABASE_URL}/storage/v1/object/public/${Env.S3_BUCKET}/${image}`;
}
