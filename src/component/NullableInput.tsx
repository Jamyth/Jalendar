import React from 'react';
import { Input, useColorModeValue } from '@chakra-ui/react';
import { ControlledFormValue } from 'jamyth-web-util';

interface Props extends ControlledFormValue<string | null> {
    placeholder?: string;
    disabled?: boolean;
}

export const NullableInput = React.memo(({ value, onChange, placeholder, disabled }: Props) => {
    const backgroundColor = useColorModeValue('gray.100', 'gray.600');

    const onTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        onChange(value.trim() ? value : null);
    };

    return (
        <Input
            backgroundColor={backgroundColor}
            border="none"
            value={value || ''}
            placeholder={placeholder}
            onChange={onTextChange}
            _focus={{
                boxShadow: 'none',
                border: 'none',
            }}
            cursor={disabled ? 'none' : undefined}
        />
    );
});
