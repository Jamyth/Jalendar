import Recoil from 'recoil';
import { injectLifeCycle, useCoilState, useHistory } from 'coil-react';
import { Main } from './Main';
import type { State } from './type';
import type { Location } from 'history';
import { useCommonCalendarAction } from '../common/calendar/index';

const initialState: State = {
    selectedDate: new Date(),
    calendarDate: new Date(),
};

export const MainState = Recoil.atom({
    key: 'MainState',
    default: initialState,
});

export const useMainAction = () => {
    const { getState, setState } = useCoilState(MainState);
    const { getEvents } = useCommonCalendarAction();
    const history = useHistory<any>();

    const onMount = () => {
        document.body.style.overflow = 'hidden';
    };

    const onRouteMatched = (routeParameter: any, location: Location<Readonly<any> | undefined>) => {
        // TODO
    };

    const updateSelectedDate = (date: Date) => {
        setState((state) => (state.selectedDate = date));
        getEvents(date);
    };

    const updateCalendarDate = (date: Date) => {
        setState((state) => (state.calendarDate = date));
    };

    return {
        onMount,
        onRouteMatched,
        updateSelectedDate,
        updateCalendarDate,
    };
};

export const MainComponent = injectLifeCycle<any, any>(Main, useMainAction);
