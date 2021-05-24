import React from 'react';
import { DrawerModal } from 'component/DrawerModal';
import { useCommonDrawerModalAction } from '../index';
import { useCommonDrawerModalState } from '../hooks';
import { Flex, Heading, HStack } from '@chakra-ui/layout';
import { NullableInput } from 'component/NullableInput';
import { NullableTextArea } from 'component/NullableTextArea';
import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { TimePicker } from 'component/TimePicker';
import { useMainState } from 'module/main/hooks';
import { CalendarUtil } from 'util/CalendarUtil';
import { EnumUtil } from 'jamyth-web-util';
import { EventType } from '../../../../type/Event';
import { EventUtil } from '../../../../util/EventUtil';

export const Main = React.memo(() => {
    const isOpen = useCommonDrawerModalState((state) => state.editingData !== null);
    const { closeModal, updateForm, createOrUpdateEvent } = useCommonDrawerModalAction();
    const data = useCommonDrawerModalState((state) => state.editingData);
    const currentDate = useMainState((state) => state.selectedDate);
    const isEditing = (data && 'id' in data) ?? false;

    const [startDrawerOpen, setStartDrawerOpen] = React.useState(false);
    const [endDrawerOpen, setEndDrawerOpen] = React.useState(false);
    const toggleStart = () => setStartDrawerOpen(!startDrawerOpen);
    const toggleEnd = () => setEndDrawerOpen(!endDrawerOpen);

    return (
        <DrawerModal isOpen={isOpen} onClose={closeModal}>
            <Heading fontSize="md" textAlign="center" pb={2}>
                {isEditing ? 'Update event' : 'Add Event'}
            </Heading>
            {data && (
                <React.Fragment>
                    <Box mb={4}>
                        <NullableInput
                            placeholder="Title"
                            value={data.title}
                            onChange={(title) => updateForm({ title })}
                        />
                    </Box>
                    <HStack mb={4}>
                        <Box onClick={toggleStart}>
                            <NullableInput
                                disabled
                                placeholder="Start"
                                value={CalendarUtil.getHourMinutes(data.start)
                                    .map((_) => CalendarUtil.zeroPad(_, 2))
                                    .join(' : ')}
                                onChange={() => {}}
                            />
                        </Box>
                        <Box onClick={toggleEnd}>
                            <NullableInput
                                disabled
                                placeholder="End"
                                value={CalendarUtil.getHourMinutes(data.end)
                                    .map((_) => CalendarUtil.zeroPad(_, 2))
                                    .join(' : ')}
                                onChange={() => {}}
                            />
                        </Box>
                    </HStack>
                    <Box mb={4}>
                        <NullableTextArea
                            placeholder="Description"
                            value={data.description}
                            onChange={(description) => updateForm({ description })}
                        />
                    </Box>
                    <ButtonGroup mb={4}>
                        {EnumUtil.toArray(EventType).map((_) => {
                            return (
                                <Button
                                    onClick={() => updateForm({ type: _ })}
                                    colorScheme={EventUtil.getEventColor(_)}
                                    variant={data?.type === _ ? 'solid' : 'outline'}
                                >
                                    {_}
                                </Button>
                            );
                        })}
                    </ButtonGroup>
                    <Button backgroundColor="teal" color="white" mt={2} onClick={createOrUpdateEvent}>
                        {isEditing ? 'Update event' : 'Add Event'}
                    </Button>
                    <DrawerModal nested isOpen={startDrawerOpen} onClose={toggleStart}>
                        <TimePicker value={data.start} onChange={(start) => updateForm({ start })} />
                    </DrawerModal>
                    <DrawerModal nested isOpen={endDrawerOpen} onClose={toggleEnd}>
                        <TimePicker value={data.end} onChange={(end) => updateForm({ end })} />
                    </DrawerModal>
                </React.Fragment>
            )}
        </DrawerModal>
    );
});
