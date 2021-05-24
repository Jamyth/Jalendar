import Recoil from 'recoil';
import { injectLifeCycle, useCoilState, useHistory } from 'coil-react';
import { Main } from './Main';
import type { State } from './type';
import type { Location } from 'history';
import { DateUtil } from 'jamyth-web-util';
import { useMainState } from '../../main/hooks';
import { CalendarUtil } from 'util/CalendarUtil';
import { EventUtil } from 'util/EventUtil';
import { Event } from 'type/Event';

const initialState: State = {
    today: new Date(),
    events: [],
};

const getInitialState = (): State => ({
    today: DateUtil.today('day-start'),
    events: [],
});

export const CommonCalendarState = Recoil.atom({
    key: 'CommonCalendarState',
    default: initialState,
});

export const useCommonCalendarAction = () => {
    const { getState, setState } = useCoilState(CommonCalendarState);
    const selectedDate = useMainState((state) => state.selectedDate);
    const history = useHistory<any>();

    const onMount = () => {
        setState(getInitialState());
        getEvents(selectedDate);
    };

    const getEvents = (date: Date = selectedDate) => {
        const dateArray = CalendarUtil.getDateArray(date);
        const overview = EventUtil.getEventOverview(dateArray);
        const allEvents = EventUtil.getEvents();
        const ids = Object.keys(overview);
        const events = ids
            .map((_) => {
                const event = allEvents[_];
                if (!event) {
                    return;
                }

                event.start = new Date(event.start);
                event.end = new Date(event.end);
                return event;
            })
            .filter((_) => _ !== undefined) as unknown as Event[];

        setState((state) => (state.events = events));
    };

    return {
        onMount,
        getEvents,
    };
};

export const MainComponent = injectLifeCycle<any, any>(Main, useCommonCalendarAction);
