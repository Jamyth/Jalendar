import { Event, EventOverview, ScheduledEventMap } from 'type/Event';
import { EventType } from '../type/Event';
import { CalendarUtil } from './CalendarUtil';

const eventKey = '@@Jalendar/events';
const scheduledEventsKeys = '@@Jalendar/scheduled';

function setEvent(event: Event): boolean {
    const id = event.id;
    const events = getEvents();
    const isExist = events[id];
    events[id] = event;
    localStorage.setItem(eventKey, JSON.stringify(events));

    const overview = getEventOverview(event.date);
    overview[id] = event.type;
    localStorage.setItem('@@Jalendar/' + event.date.join('-'), JSON.stringify(overview));
    // update overview
    if (isExist && isExist.type !== event.type) {
        return true;
    }
    return false;
}

function getEvents(): Record<string, Event> {
    const rawEvent = localStorage.getItem(eventKey);
    if (!rawEvent) {
        return {};
    }
    return JSON.parse(rawEvent);
}

function getEventOverview(date: string[]): EventOverview {
    const rawEventOverview = localStorage.getItem('@@Jalendar/' + date.join('-'));
    if (!rawEventOverview) {
        return {};
    }
    return JSON.parse(rawEventOverview);
}

function getScheduledEvents(): ScheduledEventMap {
    const rawScheduledEventMap = localStorage.getItem(scheduledEventsKeys);
    if (!rawScheduledEventMap) {
        return {
            Sunday: [],
            Monday: [],
            Tuesday: [],
            Wednesday: [],
            Thursday: [],
            Friday: [],
            Saturday: [],
        };
    }
    return JSON.parse(rawScheduledEventMap);
}

function getEventColor(type: EventType): string {
    switch (type) {
        case EventType.CHORES:
            return 'teal';
        case EventType.HANGOUT:
            return 'yellow';
        case EventType.WORK:
            return 'blue';
    }
}

function getSelectedDateEvents(selectedDate: Date) {
    const dateArray = CalendarUtil.getDateArray(selectedDate);
    const overview = getEventOverview(dateArray);
    const allEvents = getEvents();
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
    return events;
}

export const EventUtil = Object.freeze({
    setEvent,
    getEvents,
    getEventOverview,
    getScheduledEvents,
    getEventColor,
    getSelectedDateEvents,
});
