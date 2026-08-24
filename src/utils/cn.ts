import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//! ПРИКЛАД ВИКОРИСТАННЯ
//* Замість складних конкатенацій рядків:
// <button className={cn(
//   "px-4 py-2 rounded text-white font-medium",
//   isPrimary ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700",
//   disabled && "opacity-50 cursor-not-allowed"
// )}>
//   Кнопка
// </button>