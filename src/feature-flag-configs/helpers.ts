import { ConfigJson, FeatureFlagsState } from './types';

/**
 * As we get the data from server in future we need to run through validator function to check if the schema is in correct order
 */
export const checkIfJSONIsValid = (json: ConfigJson) => {
  const validStatuses = [
    'visible',
    'hidden',
    'presenting-teaser',
    'coming-soon'
  ];
  let isValid = Object.values(json.featureFlags).every(status =>
    validStatuses.includes(status)
  );
  if (json?.id === undefined) {
    isValid = false;
    console.log(
      'Invalid JSON schema, side-nav-config JSON schema does not have an id field'
    );
  }
  if (!isValid) {
    console.log(
      'Invalid JSON schema, side-nav-config JSON schema is malformed'
    );
    throw new Error('Invalid JSON schema');
  }
  return true;
};

export const getValueGivenKeyAndConfig = (
  json: ConfigJson,
  key: string
): FeatureFlagsState => {
  if (json?.featureFlags[key]) {
    return json.featureFlags[key];
  }
  return 'hidden';
};
