import {isEqual} from 'lodash';
import {type ReactNode, useEffect, useState} from 'react';
import {BreakpointsDevices, BreakpointsMedia, BreakpointsSelectors} from './breakpoints';
import {BreakpointsContext} from './BreakpointsContext';

type BreakpointsProviderProps = {
  children: ReactNode;
}

export function BreakpointsProvider({ children } : BreakpointsProviderProps) {

  const [activeBreakpoints, setActiveBreakpoints] = useState<BreakpointsDevices[]>([]);

  useEffect(() => {

    const updateActiveBreakpoints = () => {

      const newActiveBreakpoints = [
        ...BreakpointsSelectors.keys()
      ].map((breakpointsDevice) => {
        return BreakpointsSelectors.get(breakpointsDevice)!;
      }).map((selector) => {
        return matchMedia(selector);
      }).filter((mediaQueryList) => {
        return mediaQueryList.matches;
      }).map((mediaQueryList) => {
        return BreakpointsMedia.get(mediaQueryList.media)!;
      });

      if (!isEqual(activeBreakpoints, newActiveBreakpoints)) {
        setActiveBreakpoints(newActiveBreakpoints);
      }
    };

    window.addEventListener('resize', updateActiveBreakpoints);
    updateActiveBreakpoints();

    return () => window.removeEventListener('resize', updateActiveBreakpoints);
  }, [activeBreakpoints]);

  return (
    <BreakpointsContext.Provider value={{activeBreakpoints}}>
      {children}
    </BreakpointsContext.Provider>
  );
}
