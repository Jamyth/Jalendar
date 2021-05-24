import React from 'react';
import { Picker } from 'component/Picker';
import { CalendarUtil } from '../util/CalendarUtil';

interface Props {
    value: Date;
    onChange: (value: Date) => void;
}

const hours = [...new Array(24)].map((_, i) => i);
const minutes = [...new Array(60)].map((_, i) => i);

export const TimePicker = React.memo(({ value, onChange }: Props) => {
    const values = CalendarUtil.getHourMinutes(value);

    return (
        <Picker
            values={values}
            data={[hours, minutes]}
            onChange={(newValues) => {
                onChange(CalendarUtil.getDateFromHourMinutes(value, ...(newValues as [number, number])));
            }}
            suffix={['HR', 'MIN']}
            translators={[(_) => CalendarUtil.zeroPad(_ as number, 2), (_) => CalendarUtil.zeroPad(_ as number, 2)]}
        />
    );
});
