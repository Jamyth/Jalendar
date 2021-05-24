import { Box, Center, Flex, VStack } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import React from 'react';
import { BiPlus } from 'react-icons/bi';
import { MainComponent as DrawerModal, useCommonDrawerModalAction } from 'module/common/drawer-modal';
import { useMainState } from 'module/main/hooks';
import { EventCard } from 'component/EventCard';
import { EventUtil } from 'util/EventUtil';
import { useCommonCalendarState } from '../../hooks';

export const Schedule = React.memo(() => {
    const { openModal } = useCommonDrawerModalAction();
    const events = useCommonCalendarState((state) => state.events);

    return (
        <React.Fragment>
            <Flex px={4} py={2} alignItems="center" justifyContent="space-between">
                <Box fontSize="lg" fontWeight="medium">
                    Schedule
                </Box>
                <Button onClick={() => openModal()} backgroundColor="teal" color="white" h={8} shadow="md">
                    <BiPlus fontSize="20px" />
                    <Box as="span">Add event</Box>
                </Button>
            </Flex>
            <Flex flex={1} flexDirection="column" overflowY="scroll" px={4}>
                {events.length ? (
                    <VStack pb={4}>
                        {events.map((_, i) => (
                            <EventCard event={_} key={i} />
                        ))}
                    </VStack>
                ) : (
                    <Flex w="100%" h="100%" alignItems="center" justifyContent="center" flex={1}>
                        No Events
                    </Flex>
                )}
            </Flex>
            <DrawerModal />
        </React.Fragment>
    );
});
