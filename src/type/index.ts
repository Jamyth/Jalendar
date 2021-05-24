import React from 'react';

export type SafeReactChild = React.ReactChild | boolean | null;
export type SafeReactChildren = SafeReactChild | SafeReactChild[];
export type Nullable<T extends object> = { [P in keyof T]: T[P] | null };
export type MarkAsNonNullable<T extends object, K extends keyof T> = Omit<T, K> & { [P in K]: Exclude<T[P], null> };
