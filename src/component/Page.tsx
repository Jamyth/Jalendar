import { Flex } from '@chakra-ui/react';
import React from 'react';
import { SafeReactChild, SafeReactChildren } from 'type';

interface Props {
    header: SafeReactChild;
    children: SafeReactChildren;
    footer?: SafeReactChild;
}

export const Page = React.memo(({ header, children, footer }: Props) => {
    const [height, setHeight] = React.useState(window.innerHeight);

    const correctHeight = () => {
        setHeight(window.innerHeight);
    };

    React.useEffect(() => {
        correctHeight();

        window.addEventListener('resize', correctHeight);

        return () => {
            window.removeEventListener('resize', correctHeight);
        };
    }, []);

    return (
        <Flex h={height} maxH={height} overflow="hidden" flex={1} flexDirection="column">
            {header}
            <Flex flex={1} flexDirection="column" overflowY="scroll" overflowX="hidden" w="100%">
                {children}
            </Flex>
            {footer}
        </Flex>
    );
});
