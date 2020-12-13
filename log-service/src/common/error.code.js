const prefix = 'log-service';

const makeMessage = (errorCode, message) => ({
  code: `${prefix}-${errorCode}`,
  message
});

module.exports = {
  
};
