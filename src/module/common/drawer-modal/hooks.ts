import Recoil from 'recoil'
import { CommonDrawerModalState } from 'module/common/drawer-modal'
import type { State } from './type'

export const useCommonDrawerModalState = <T>(fn: (state: State) => T): T => {
    const state = Recoil.useRecoilValue(CommonDrawerModalState);
    return fn(state);
}