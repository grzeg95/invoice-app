export enum BreakpointsDevices {
  mobile = 'mobile',
  tablet = 'tablet',
  desktop = 'desktop'
}

export const BreakpointsMin = {
  [BreakpointsDevices.mobile]: 0,
  [BreakpointsDevices.tablet]: 768,
  [BreakpointsDevices.desktop]: 1440
};

export const BreakpointsSelectors = new Map<BreakpointsDevices, string>([
  [BreakpointsDevices.mobile, `(min-width: 0) and (max-width: ${BreakpointsMin.tablet - 1}px)`],
  [BreakpointsDevices.tablet, `(min-width: ${BreakpointsMin.tablet}px) and (max-width: ${BreakpointsMin.desktop - 1}px)`],
  [BreakpointsDevices.desktop, `(min-width: ${BreakpointsMin.desktop}px)`]
]);

export const BreakpointsMedia = new Map<string, BreakpointsDevices>([
  [BreakpointsSelectors.get(BreakpointsDevices.mobile)!, BreakpointsDevices.mobile],
  [BreakpointsSelectors.get(BreakpointsDevices.tablet)!, BreakpointsDevices.tablet],
  [BreakpointsSelectors.get(BreakpointsDevices.desktop)!, BreakpointsDevices.desktop]
]);
