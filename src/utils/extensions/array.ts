import { Integer } from './number'

export {}

declare global {
  interface Array<T> {
    isEmpty(): boolean

    isNotEmpty(): boolean

    first(): T | null

    last(): T | null

    lastIndex(): number
  }
}

Array.prototype.isEmpty = function <T>(this: T[]): boolean {
  return this.length.isEqualTo(Integer.ZERO)
}

Array.prototype.isNotEmpty = function <T>(this: T[]): boolean {
  return !this.isEmpty()
}

Array.prototype.first = function <T>(this: T[]): T | null {
  return this[Integer.ZERO] || null
}

Array.prototype.last = function <T>(this: T[]): T | null {
  return this[this.length - Integer.ONE] || null
}

Array.prototype.lastIndex = function <T>(this: T[]): number {
  return this.length - Integer.ONE
}
