import {createContext} from 'react';
import {BreakpointsDevices} from './breakpoints';

export const BreakpointsContext = createContext<{
  activeBreakpoints: BreakpointsDevices[]
}>({
  activeBreakpoints: []
});


