const error = { success: false };
export const errorOnDownload = { ...error, error: "Downloading failed" };
export const errorOnFailure = {
  ...error,
  error: "Downloading failed, An error occurred",
};
export const errorOnIDNotFound = {
  ...error,
  error: "Downloading failed, ID not found",
};
export const errorOnDB = {
  ...error,
  error: "Downloading failed, Database error",
};
export const errorOnCaptchaVerification = {
  ...error,
  error: "Downloading failed, Captcha verification failed",
};
