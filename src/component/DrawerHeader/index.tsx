import { Box, Flex } from '@chakra-ui/layout';
import React from 'react';
import { HiMenu } from 'react-icons/hi';
import { DrawerMenu } from './DrawerMenu';
import { SafeReactChild } from 'type';

interface Props {
    title: SafeReactChild;
    alignLeft?: boolean;
}

export const DrawerHeader = React.memo(({ title, alignLeft = false }: Props) => {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggle = () => setOpenDrawer(!openDrawer);

    return (
        <Flex
            justifyContent={alignLeft ? undefined : 'center'}
            alignItems="center"
            p={4}
            position="relative"
            fontWeight="bold"
        >
            {title}
            <Box
                onClick={toggle}
                fontSize="3xl"
                position="absolute"
                top="50%"
                transform="translateY(-50%)"
                right={4}
                zIndex={1}
            >
                <HiMenu />
            </Box>
            <DrawerMenu isOpen={openDrawer} toggle={toggle} />
        </Flex>
    );
});
