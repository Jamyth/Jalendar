import { Drawer, DrawerBody, DrawerContent, DrawerOverlay, DrawerHeader } from '@chakra-ui/modal';
import { DrawerFooter } from '@chakra-ui/react';
import React from 'react';
import { IoIosCalendar } from 'react-icons/io';

interface Props {
    isOpen: boolean;
    toggle: () => void;
}

const version = '1.0.0';

export const DrawerMenu = React.memo(({ isOpen, toggle }: Props) => {
    return (
        <Drawer isOpen={isOpen} onClose={toggle} placement="right" size="xs">
            <DrawerOverlay />
            <DrawerContent maxW="200px" py={2} px={4}>
                <DrawerHeader p={0} justifyContent="center" alignItem="center" d="flex">
                    Jalendar
                    <IoIosCalendar />
                </DrawerHeader>
                <DrawerBody></DrawerBody>
                <DrawerFooter p={0} fontSize="sm">
                    Version {version}
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
});
