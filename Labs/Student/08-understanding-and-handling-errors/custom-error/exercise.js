// 1. Give this error a code of ERR_CUSTOM_ERROR
// 2. Give it a name of "CUSTOM_ERROR"
export class GcpError extends Error {
  constructor(params) {
    super(params);
    this.code = "ERR_CUSTOM_ERROR";
  }

  get name() {
    return "CUSTOM_ERROR";
  }
  // CODE HERE
}

// Have this function return an error that has an error code of
// ERR_RETURNED_ERROR
export function customNewError(code) {
  // Code here
  const err = new GcpError();
  err.code = code;
  return err;
}
