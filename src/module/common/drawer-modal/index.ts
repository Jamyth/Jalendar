import Recoil from 'recoil';
import { injectLifeCycle, useCoilState, useHistory } from 'coil-react';
import { Main } from './Main';
import type { State } from './type';
import type { Location } from 'history';
import { ObjectUtil, DateUtil } from 'jamyth-web-util';
import { useMainState } from 'module/main/hooks';
import { EventUtil } from 'util/EventUtil';
import { EventWithoutId } from 'type/Event';
import { MarkAsNonNullable, Nullable } from 'type';
import { Event } from 'type/Event';
import { CalendarUtil } from 'util/CalendarUtil';
import { useMainAction } from '../../main/index';
import { useCommonCalendarAction } from '../calendar';
import { v4 as uuid } from 'uuid';

const getInitialEditingData = (): MarkAsNonNullable<Nullable<EventWithoutId>, 'start' | 'end'> => ({
    type: null,
    date: null,
    start: DateUtil.today('day-start'),
    end: DateUtil.today('day-end'),
    title: null,
    description: null,
});

const initialState: State = {
    editingData: null,
};

export const CommonDrawerModalState = Recoil.atom({
    key: 'CommonDrawerModalState',
    default: initialState,
});

export const useCommonDrawerModalAction = () => {
    const { getState, setState } = useCoilState(CommonDrawerModalState);
    const currentDate = useMainState((state) => state.selectedDate);
    const { getEvents } = useCommonCalendarAction();
    const history = useHistory<any>();

    const onMount = () => {
        resetForm();
    };

    const openModal = (event?: Event) => {
        const editingData = getInitialEditingData();
        if (currentDate) {
            editingData.date = CalendarUtil.getDateArray(currentDate);
            editingData.start = DateUtil.someday(currentDate, 'day-start');
            editingData.end = DateUtil.someday(currentDate, 'day-end');
        }
        setState((state) => (state.editingData = event ? (event as any) : editingData));
    };

    const closeModal = () => {
        setState((state) => (state.editingData = null));
    };

    const resetForm = () => {
        setState((state) => ObjectUtil.safeAssign(state.editingData, getInitialEditingData()));
    };

    const updateForm = (form: Partial<State['editingData']>) => {
        setState((state) => ObjectUtil.safeAssign(state.editingData, form));
    };

    const createOrUpdateEvent = () => {
        const event = getState().editingData!;
        const { type, date, start, end, title, description } = event;
        if (!type || !date || !start || !end || !title) {
            return;
        }
        const id = 'id' in event ? event.id : uuid();
        EventUtil.setEvent({
            id,
            type,
            date,
            start,
            end,
            title,
            description,
        });
        getEvents();
        closeModal();
    };

    return {
        onMount,
        resetForm,
        updateForm,
        createOrUpdateEvent,
        openModal,
        closeModal,
    };
};

export const MainComponent = injectLifeCycle<any, any>(Main, useCommonDrawerModalAction);
