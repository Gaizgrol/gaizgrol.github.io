export const DEGTORAD = Math.PI/180
export const RADTODEG = 180/Math.PI

export const degToUnitVector = (degrees: number): [number, number] => [Math.cos(degrees*DEGTORAD), Math.sin(degrees*DEGTORAD)]
export const getCircleSliceAngle = (slices: number) => 360/slices
export const normalize = (min: number, max: number, value: number): number => {
    const diff = max-min
    const normalized = (value-min)/diff
    return Math.max(0, Math.min(1, normalized))
}
export const unitToBoxPercentage = ([x, y]: [number, number]): [string, string] => [
    normalize(-1, 1, x)*100+'%',
    normalize(-1, 1, y)*100+'%'
]
export const degToBoxPercentage = (degrees: number) => unitToBoxPercentage(degToUnitVector(degrees))
export const randomRange = (min: number, max: number) => min + Math.random() * (max - min)
