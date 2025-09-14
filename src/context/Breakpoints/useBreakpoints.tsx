import {useContext} from 'react';
import {BreakpointsContext} from './BreakpointsContext';

export function useBreakpoints() {

  const breakpointsContext = useContext(BreakpointsContext);

  if (!breakpointsContext) {
    throw new Error('useBreakpoints must be used within the BreakpointsProvider');
  }

  return breakpointsContext;
}
