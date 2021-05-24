import { startApp } from 'coil-react';
import { MainComponent } from 'module/main';

startApp({
    MainComponent,
    entryElement: document.getElementById('app'),
    useError: () => () => {},
});
