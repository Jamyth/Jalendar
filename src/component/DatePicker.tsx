import React from 'react';
import { Picker } from 'component/Picker';
import { CalendarUtil } from '../util/CalendarUtil';

interface Props {
    value: Date;
    onChange: (value: Date) => void;
}

const months = [...new Array(12)].map((_, i) => i);

export const DatePicker = React.memo(({ value, onChange }: Props) => {
    const currentYear = value.getFullYear();
    const years = [...new Array(10)].map((_, i) => currentYear - 5 + i);

    const getValue = () => {
        return [value.getFullYear(), value.getMonth() + 1];
    };

    return (
        <Picker
            values={getValue()}
            data={[years, months]}
            onChange={(newValues) => {
                const _values = [...(newValues as [number, number]), 1]
                    .map((_) => CalendarUtil.zeroPad(_, 2))
                    .join('-');
                onChange(new Date(_values));
            }}
            // suffix={['HR', 'MIN']}
            translators={[(_) => `${_}`, (_) => `${_}`]}
        />
    );
});
