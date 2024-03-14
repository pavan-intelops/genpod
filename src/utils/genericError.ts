export const genericError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: unknown | any
): {
  error: string | Error;
} => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const errorMessage = error.response.data?.message || error.message;
    return { error: new Error(errorMessage) };
  } else if (error.request) {
    // The request was made but no response was received
    return {
      error: new Error('The request was made but no response was received')
    };
  } else {
    // Something happened in setting up the request that triggered an Error
    return { error: new Error('Something went wrong') };
  }
};
