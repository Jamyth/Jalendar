import { CalendarUtil } from 'util/CalendarUtil';

export enum EventType {
    CHORES = 'CHORES',
    WORK = 'WORK',
    HANGOUT = 'HANGOUT',
}

export interface Event {
    type: EventType;
    date: string[];
    start: Date;
    end: Date;
    title: string;
    description: string | null;
    id: string;
}

export type EventWithoutId = Omit<Event, 'id'>;

export type EventOverview = Record<string, EventType>;

export type ScheduledEventMap = Record<keyof typeof CalendarUtil.WEEK_DAYS, Event[]>;
