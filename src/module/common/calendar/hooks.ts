import Recoil from 'recoil'
import { CommonCalendarState } from 'module/common/calendar'
import type { State } from './type'

export const useCommonCalendarState = <T>(fn: (state: State) => T): T => {
    const state = Recoil.useRecoilValue(CommonCalendarState);
    return fn(state);
}