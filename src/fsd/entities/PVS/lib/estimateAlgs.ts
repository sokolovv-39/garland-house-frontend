import { PVSColorEnum } from "../model";

export function getPVSLength(length: number, color: PVSColorEnum) {
    if (color === PVSColorEnum.Black) {
        const skein = 100
        const skeinsQuantity = Math.ceil(length / skein)
        return skeinsQuantity
    } else if (color === PVSColorEnum.White) {
        const skein = 50
        const skeinsQuantity = Math.ceil(length / skein)
        return skeinsQuantity
    } return 0
}
