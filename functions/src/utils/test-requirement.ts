import {HttpsError} from 'firebase-functions/v2/https';
import {TestRequirementFunctionsErrorCode, TestRequirementFunctionsErrorCodeMap} from './error';

export const testRequirement = (failed: boolean, httpsError: {
  code: TestRequirementFunctionsErrorCode;
  message?: string;
}): void => {
  if (failed) {
    throw new HttpsError(
      httpsError.code,
      httpsError?.message || TestRequirementFunctionsErrorCodeMap.get(httpsError.code)!
    );
  }
};
