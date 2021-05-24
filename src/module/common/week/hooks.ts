import Recoil from 'recoil'
import { CommonWeekState } from 'module/common/week'
import type { State } from './type'

export const useCommonWeekState = <T>(fn: (state: State) => T): T => {
    const state = Recoil.useRecoilValue(CommonWeekState);
    return fn(state);
}