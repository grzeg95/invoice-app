export type TestRequirementFunctionsErrorCode = 'invalid-argument' | 'not-found' | 'permission-denied' | 'resource-exhausted' | 'internal' | 'unauthenticated';

export const TestRequirementFunctionsErrorCodeMap = new Map<TestRequirementFunctionsErrorCode, string>([
  ['invalid-argument', 'Invalid argument'],
  ['not-found', 'Not found'],
  ['permission-denied', 'Permission denied'],
  ['resource-exhausted', 'Resource exhausted'],
  ['internal', 'Internal'],
  ['unauthenticated', 'Unauthenticated'],
]);
