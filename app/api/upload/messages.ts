const error = { success: false };
export const errorOnUpload = {
  ...error,
  error: "Uploading failed, Upload failed",
};
export const errorOnFailure = {
  ...error,
  error: "Uploading failed, An error occurred",
};
export const errorOnFileNotFound = {
  ...error,
  error: "Uploading failed, File not found",
};
export const errorOnDB = {
  ...error,
  error: "Uploading failed, Database error",
};
export const errorOnSize = {
  ...error,
  error: "Uploading failed, File too large",
};
export const errorOnVercel = {
  ...error,
  error: "Vercel size limit Is 4.4 MB!",
};
export const errorOnCaptchaVerification = {
  ...error,
  error: "Uploading failed, Captcha verification failed",
};
