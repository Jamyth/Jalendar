import React from 'react';
import { Swipe } from './Swipe';
import { Box, Flex } from '@chakra-ui/layout';

export const ItemHeight = 42;

interface Props<Enum extends string | number> {
    value: Enum;
    data: Enum[];
    onChange: (value: Enum) => void;
    translator?: (value: Enum) => string;
    suffix?: string;
}

/**
 * Use Inverse cube function for inverse relationship between animation duration and velocity.
 * e.g. Drag faster -> shorter animations, Drag slower -> longer animations
 * @param velocity
 */
function computeTransitionDuration(velocity: number) {
    return Math.min((1 + velocity) ** -3, 0.2);
}

/**
 * Computes the difference in index after user drag event is complete.
 * @param delta Drag event in pixels
 * @param velocity If drag event has slow velocity, just use current "selected value".
 */
function computeTargetIndex(delta: number, velocity: number) {
    // If slow drag just use what ever "selected value"
    // Using Math.ceil to allow small movement to trigger index change.
    return velocity < 0.15 ? Math.round(delta / ItemHeight) : Math.ceil(velocity * 10) * (delta < 0 ? -1 : 1);
}

export const Column = React.memo(function <Enum extends string | number>({
    value,
    onChange,
    data,
    translator,
    suffix,
}: Props<Enum>) {
    const [transitionDuration, setTransitionDuration] = React.useState(0);

    const currentIndex = React.useMemo(() => {
        const index = data.findIndex((_) => _ === value);
        return index >= 0 ? index : 0;
    }, [value, data]);

    const handleOnRelease = (delta: number, velocity: number) => {
        const matchedIndex = Math.min(data.length - 1, Math.max(currentIndex - computeTargetIndex(delta, velocity), 0));
        setTransitionDuration(computeTransitionDuration(velocity));
        onChange(data[matchedIndex]);
    };

    return (
        <Flex flexFlow="row nowrap" position="relative">
            <Swipe
                direction="vertical"
                baseOffset={(-currentIndex + 2) * ItemHeight}
                transitionDurationSeconds={transitionDuration}
                onRelease={handleOnRelease}
            >
                {data.map((_, key) => (
                    <Flex
                        key={key}
                        h="42px"
                        lineHeight="42px"
                        flexFlow="row"
                        justifyContent="center"
                        alignItems="center"
                        zIndex={0}
                    >
                        {translator ? translator(_) : _.toString()}
                    </Flex>
                ))}
            </Swipe>
            <Box fontSize="18px" zIndex={2} position="absolute" left="150%" top="50%" transform="translateY(-50%)">
                {suffix}
            </Box>
        </Flex>
    );
});
