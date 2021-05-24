import React from 'react';
import { Textarea, useColorModeValue } from '@chakra-ui/react';
import { ControlledFormValue } from 'jamyth-web-util';

interface Props extends ControlledFormValue<string | null> {
    placeholder?: string;
}

export const NullableTextArea = React.memo(({ value, onChange, placeholder }: Props) => {
    const backgroundColor = useColorModeValue('gray.100', 'gray.600');
    const onTextChange = (value: string) => {
        onChange(value.trim() ? value : null);
    };

    return (
        <Textarea
            _focus={{
                boxShadow: 'none',
                border: 'none',
            }}
            backgroundColor={backgroundColor}
            border="none"
            placeholder={placeholder}
            value={value || ''}
            resize="none"
            onChange={(e) => onTextChange(e.target.value)}
        />
    );
});
