import React from 'react';
import { MainComponent as Calendar } from 'module/common/calendar';
import { MainComponent as Week } from 'module/common/week';

export type Path = '/calendar' | '/week';

export interface RouteConfig {
    component: React.ComponentType<any>;
}

export const NavigationService: Record<Path, RouteConfig> = {
    '/calendar': {
        component: Calendar,
    },
    '/week': {
        component: Week,
    },
};
