import { Center, Grid, HStack, Square } from '@chakra-ui/layout';
import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import { CalendarUtil } from 'util/CalendarUtil';
import { useCommonCalendarState } from '../hooks';
import { useMainState } from 'module/main/hooks';
import { useMainAction } from 'module/main';
import { EventUtil } from 'util/EventUtil';

export const Calendar = React.memo(() => {
    const selectedDate = useMainState((state) => state.selectedDate);
    const calendarDate = useMainState((state) => state.calendarDate);
    const { updateSelectedDate } = useMainAction();
    const calendar = CalendarUtil.getCalendar(...CalendarUtil.getMonthYearFromDate(calendarDate));
    const backgroundColor = useColorModeValue('gray.50', 'gray.700');
    const dateColor = useColorModeValue('gray.700', 'gray.200');
    const weekDayColor = useColorModeValue('gray.600', 'gray.100');

    const weekDays = CalendarUtil.WEEK_DAYS;

    const renderDay = (day: string, index: number) => {
        return (
            <Center textTransform="uppercase" fontWeight="bold" color={weekDayColor} fontSize="sm" key={index}>
                {day}
            </Center>
        );
    };

    const renderDate = (date: string[], index: number) => {
        const _date = new Date(date.join('-'));
        const isToday = CalendarUtil.isSameDay(_date);
        const isCurrentMonth = CalendarUtil.isSameMonth(_date);
        const isCurrentDate = CalendarUtil.isSameDay(selectedDate, _date);

        const overview = EventUtil.getEventOverview(date);

        const onClick = () => {
            updateSelectedDate(_date);
        };

        return (
            <Flex flexDirection="column" alignItems="center" key={index}>
                <Square
                    onClick={onClick}
                    borderRadius={4}
                    size="25px"
                    color={isToday ? 'white' : isCurrentMonth ? dateColor : 'gray.400'}
                    backgroundColor={isToday ? 'teal' : undefined}
                    borderWidth="1px"
                    borderColor={isCurrentDate ? 'teal' : 'transparent'}
                >
                    {date[2]}
                </Square>
                <HStack spacing={1} h="12px" alignItems="center">
                    {Object.values(overview).map((_, i) => {
                        if (i > 2) {
                            return null;
                        }
                        const color = EventUtil.getEventColor(_);
                        return (
                            <Box
                                w="5px"
                                h="5px"
                                key={i}
                                backgroundColor={color === 'teal' ? color : `${color}.300`}
                                borderRadius="50%"
                            />
                        );
                    })}
                </HStack>
            </Flex>
        );
    };

    return (
        <Box py={2} px={4} backgroundColor={backgroundColor}>
            <Grid templateColumns="repeat(7, 1fr)">{Object.values(weekDays).map(renderDay)}</Grid>
            <Grid templateColumns="repeat(7, 1fr)" templateRows="repeat(6, 1fr)" gap={1}>
                {calendar.map(renderDate)}
            </Grid>
        </Box>
    );
});
