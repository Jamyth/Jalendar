import { Drawer, DrawerContent } from '@chakra-ui/modal';
import React from 'react';
import { DrawerOverlay } from '@chakra-ui/react';
import { SafeReactChildren } from 'type';

export interface Props {
    isOpen: boolean;
    onClose: () => void;
    children: SafeReactChildren;
    nested?: boolean;
}

export const DrawerModal = React.memo(({ isOpen, onClose, children, nested = false }: Props) => {
    const overlayZIndex = nested ? 1400 : 1300;
    return (
        <Drawer isOpen={isOpen} onClose={onClose} placement="bottom" size="xs">
            <DrawerOverlay zIndex={overlayZIndex} css={{ backdropFilter: 'blur(2px)' }} />
            <DrawerContent borderRadius="25px 25px 0 0" p={4}>
                {children}
            </DrawerContent>
        </Drawer>
    );
});
