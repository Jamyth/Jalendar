import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { NavigationService } from 'util/NavigationService';
import { ObjectUtil } from 'jamyth-web-util';
import { Switch, Route, Redirect } from 'react-router-dom';

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
    },
});

export const Main = React.memo(() => {
    return (
        <ChakraProvider theme={theme}>
            <Switch>
                {ObjectUtil.toArray(NavigationService, (path, { component }) => (
                    <Route exact path={path} component={component} />
                ))}
                <Redirect to="/calendar" />
            </Switch>
        </ChakraProvider>
    );
});
