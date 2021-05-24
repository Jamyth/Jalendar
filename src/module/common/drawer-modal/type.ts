import { Nullable, MarkAsNonNullable } from 'type';
import { EventWithoutId, Event } from 'type/Event';

export interface State {
    editingData:
        | MarkAsNonNullable<Nullable<EventWithoutId>, 'start' | 'end'>
        | MarkAsNonNullable<Nullable<Event>, 'id' | 'start' | 'end'>
        | null;
}
