import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizePath(pathname = location.pathname): string {
  const cleaned = pathname.replace(/\/+$/, '').replace(/\.html$/i, '')
  if (!cleaned || cleaned === '/index') return '/'
  return cleaned
}
