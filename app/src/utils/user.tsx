import { iPosition } from '../components/LayOut/Menu'

export const maxProgress = (next:iPosition, current:iPosition) => {
    if(next.unit > current.unit) return next
    else if(next.unit < current.unit) return current

    if(next.module > current.module) return next
    else if(next.module < current.module) return current

    if(next.lesson > current.lesson) return next
    else if(next.lesson < current.lesson) return current

    return current
}
