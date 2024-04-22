export const Delays = [0, 1, 3,5] as const

export type Delay = typeof Delays[number]

export function randomDelay(): Delay {
    return Delays[Math.floor(Math.random() * Delays.length)]
}