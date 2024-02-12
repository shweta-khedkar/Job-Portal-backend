export const catchAsyncErrors = (authFunction) => {
  return (req, res, next) => {
    Promise.resolve(authFunction(req, res, next)).catch(next);
  };
};
