import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSwipeReducer } from 'util/useSwipeReducer';
import { Box } from '@chakra-ui/react';

interface Props {
    direction: 'vertical' | 'horizontal';
    children: React.ReactChild | React.ReactChild[];
    onRelease?: (delta: number, velocity: number) => void;
    shouldDrag?: (delta: number) => boolean;
    baseOffset?: number;
    transitionDurationSeconds?: number;
    preventDefault?: boolean;
}

export const Swipe = React.memo(
    ({
        direction,
        children,
        onRelease,
        shouldDrag,
        baseOffset = 0,
        transitionDurationSeconds = 0.5,
        preventDefault,
    }: Props) => {
        const { isSwiping, offset, dispatchSwipe } = useSwipeReducer();
        const handlers = useSwipeable({
            onSwiped: (e) => {
                if (preventDefault) {
                    e.event.stopPropagation();
                    e.event.preventDefault();
                }
                onRelease?.(isX ? e.deltaX : e.deltaY, e.velocity);
                dispatchSwipe('swiped');
            },

            onSwiping: (e) => {
                if (preventDefault) {
                    e.event.stopPropagation();
                    e.event.preventDefault();
                }
                if (!shouldDrag || shouldDrag(isX ? e.deltaX : e.deltaY)) {
                    dispatchSwipe(isX ? e.deltaX : e.deltaY);
                }
            },
        });
        const isX = direction === 'horizontal';

        return (
            <Box overflow="hidden" h="100%" w="100%" zIndex={1} position="relative" fontSize="21px" {...handlers}>
                <Box
                    transition={isSwiping ? undefined : 'transform 0.3s cubic-bezier(0, 0, 0.2, 1.15) 0s'}
                    transitionDuration={`${isSwiping ? 0 : transitionDurationSeconds}s`}
                    transform={`translate${isX ? 'X' : 'Y'}(${baseOffset + offset}px)`}
                >
                    {children}
                </Box>
            </Box>
        );
    },
);
