import React from 'react';
import { Page } from 'component/Page';
import { DrawerHeader } from 'component/DrawerHeader';
import { Calendar } from './Calendar';
import { Schedule } from './Schedule';
import { Box, Flex } from '@chakra-ui/layout';
import { useMainState } from 'module/main/hooks';
import { CalendarUtil } from 'util/CalendarUtil';
import { IoIosArrowDropdown } from 'react-icons/io';
import { DrawerModal } from 'component/DrawerModal';
import { DatePicker } from 'component/DatePicker';
import { useMainAction } from 'module/main';

export const Main = React.memo(() => {
    const calendarDate = useMainState((state) => state.calendarDate);
    const { updateCalendarDate } = useMainAction();
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth() + 1;
    const title = `${Object.values(CalendarUtil.CALENDAR_MONTHS)[month]}, ${year}`;

    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <Page
            header={
                <DrawerHeader
                    title={
                        <Flex alignItems="center" onClick={toggle}>
                            <Box as="span" mr="1">
                                {title}
                            </Box>
                            <Flex transform={`rotate(${isOpen ? 0 : 180}deg)`} transition="transform 0.15s ease-in-out">
                                <IoIosArrowDropdown fontSize="20px" />
                            </Flex>
                        </Flex>
                    }
                />
            }
        >
            <Flex flex={1} overflow="hidden" flexDirection="column">
                <Calendar />
                <Schedule />
            </Flex>
            <DrawerModal isOpen={isOpen} onClose={toggle}>
                <DatePicker value={calendarDate} onChange={updateCalendarDate} />
            </DrawerModal>
        </Page>
    );
});
