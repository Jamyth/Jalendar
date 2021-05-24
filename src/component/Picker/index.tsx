import React from 'react';
import { Column } from './Column';
import { Flex } from '@chakra-ui/layout';
import { Box, useColorModeValue } from '@chakra-ui/react';

interface Props<T extends string | number> {
    data: T[][];
    values: T[];
    onChange: (value: T[]) => void;
    suffix?: string[];
    translators?: ((value: T) => string)[];
}

export const Picker = React.memo(function <T extends string | number>(props: Props<T>) {
    const { data, values, onChange, suffix, translators } = props;
    const backgroundColor = useColorModeValue('rgba(243, 247, 252)', 'gray.600');

    const handleColumnChange = (columnValue: T, columnIndex: number) =>
        onChange(values.map((_, i) => (i === columnIndex ? columnValue : _)));
    return (
        <Flex
            w="100%"
            // backgroundColor="white"
            position="relative"
            flexFlow="row nowrap"
            justifyContent="space-around"
            h="210px"
        >
            {data.map((d, columnIndex) => (
                <Column
                    key={columnIndex}
                    data={d}
                    value={values[columnIndex]}
                    onChange={(newValue) => handleColumnChange(newValue as T, columnIndex)}
                    suffix={suffix?.[columnIndex] ?? undefined}
                    translator={(translators?.[columnIndex] || undefined) as any}
                />
            ))}
            <Box
                h="42px"
                position="absolute"
                bottom="50%"
                transform="translateY(50%)"
                w="100%"
                color="teal.300"
                backgroundColor={backgroundColor}
                borderLeft="4px solid"
                borderColor="teal.300"
                pointerEvents="none"
            />
            <Box
                position="absolute"
                w="100%"
                h="100%"
                top="0"
                left="0"
                // background-image="linear-gradient(to bottom, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0)), linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.5) 40%, rgba(255, 255, 255, 0))"
                backgroundRepeat="no-repeat"
                backgroundPosition="top, bottom"
                backgroundSize="100% calc(50% - 42 / 2)"
                pointerEvents="none"
                zIndex={3}
            />
        </Flex>
    );
});
