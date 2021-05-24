import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useCommonDrawerModalAction } from 'module/common/drawer-modal';
import React from 'react';
import { Event } from 'type/Event';
import { EventUtil } from '../util/EventUtil';
import { CalendarUtil } from '../util/CalendarUtil';
import { FaRegClock } from 'react-icons/fa';

interface Props {
    event: Event;
}

export const EventCard = React.memo(({ event }: Props) => {
    const color = EventUtil.getEventColor(event.type);

    const start = CalendarUtil.getHourMinutes(event.start)
        .map((_) => CalendarUtil.zeroPad(_, 2))
        .join(' : ');
    const end = CalendarUtil.getHourMinutes(event.end)
        .map((_) => CalendarUtil.zeroPad(_, 2))
        .join(' : ');

    const { openModal } = useCommonDrawerModalAction();

    return (
        <Box
            w="100%"
            onClick={() => openModal(event)}
            backgroundColor={`${color}.100`}
            borderRadius="5px"
            overflow="hidden"
        >
            <Box py={3} px={2} borderLeftWidth="5px" borderLeftColor={`${color}.400`}>
                <Heading color={`${color}.700`} fontSize="md" mb={1}>
                    {event.title}
                </Heading>
                <Text fontSize="sm" color={`${color}.500`} mb={2}>
                    {event.description}
                </Text>
                <Flex color={`${color}.700`} alignItems="center">
                    <FaRegClock />
                    <Box ml={1} fontSize="13px" fontWeight="bold">
                        {start} - {end}
                    </Box>
                </Flex>
            </Box>
        </Box>
    );
});
