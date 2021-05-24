import { Drawer, DrawerContent, DrawerOverlay } from '@chakra-ui/modal';
import React from 'react';

interface Props {
    isOpen: boolean;
    toggle: () => void;
}

export const DrawerMenu = React.memo(({ isOpen, toggle }: Props) => {
    return (
        <Drawer isOpen={isOpen} onClose={toggle} placement="right" size="xs">
            <DrawerOverlay />
            <DrawerContent maxW="200px" p={4}>
                blah
            </DrawerContent>
        </Drawer>
    );
});
