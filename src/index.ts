const a = 1 + 2;
const b = a + 3;
const c = {
  apple: a,
  banana: b,
};
const d = c.apple * 4;

// #3 the awful way they started it
// type Reservation = string
// type Reserve = {
//   (from: Date, to: Date, destination: string): Reservation
//   (from: Date, destination: string): Reservation
//   (destination: string): Reservation
// }

// let reserve: Reserve = (fromOrDestination: Date | string, toFromOrDestination?: Date | string, destination?: string) => {
//   if (fromOrDestination instanceof Date && toFromOrDestination instanceof Date && destination !== undefined) {
//     return 'Booked a round trip'
//   }

//   if (fromOrDestination instanceof Date && toFromOrDestination !== undefined && destination === undefined) {
//     return 'Booked a one-way trip'
//   }

//   if (toFromOrDestination === undefined && destination === undefined) {
//     return 'Booked a speedy booking trip'
//   }

//   return 'Not a valid reservation'
// }

// #3 the way I'd actually do it
type Reservation = string
type Reserve = {
  (destination: string): Reservation
  (destination: string, from: Date): Reservation
  (destination: string, from: Date, to: Date): Reservation
}

let reserve: Reserve = (destination: string, from?: Date, to?: Date) => {
  if (to !== undefined) {
    return 'Booked a round trip!'
  }

  if (from !== undefined) {
    return 'Booked a one way trip!'
  }

  return 'Booked a fast-book trip!'
}

// #4
function call<T extends [unknown, string, ...unknown[]], R>(f: (...args: T) => R, ...args: T): R {
  return f(...args)
}

// #5
function is<T>(...args: T[]): boolean {
  const allArguments = [...args]
  for (const arg of allArguments) {
    for (const otherArg of allArguments) {
      if (arg !== otherArg) return false
    }
  }
  return true
}

console.log(is('string', 'other'))
console.log(is(true, false))
console.log(is(42, 42))
console.log(is(10, 'foo'))
console.log(is(42, 42, 42))

// Answer from book author:
function is<T>(a: T, ...b: [T, ...T[]]): boolean {
  return b.every(_ => _ === a)
}
