import React from 'react';

export type SwipeState = { isSwiping: false; offset: 0 } | { isSwiping: true; offset: number };

export type SwipeAction = { type: 'swiping'; offset: number } | { type: 'swiped' };

const reducer: React.Reducer<SwipeState, SwipeAction> = (state, action) => {
    switch (action.type) {
        case 'swiping':
            return { isSwiping: true, offset: action.offset };
        case 'swiped':
            return { isSwiping: false, offset: 0 };
    }
};

export const useSwipeReducer = (initializerArg: SwipeState = { offset: 0, isSwiping: false }) => {
    const [{ isSwiping, offset }, dispatch] = React.useReducer(reducer, initializerArg);
    const dispatchSwipe = React.useCallback(
        (offset: number | 'swiped') =>
            offset === 'swiped' ? dispatch({ type: 'swiped' }) : dispatch({ type: 'swiping', offset }),
        [],
    );
    return { isSwiping, offset, dispatchSwipe };
};
