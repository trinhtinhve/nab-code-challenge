const prefix = 'order-service';

const makeMessage = (errorCode, message) => ({
  code: `${prefix}-${errorCode}`,
  message
});

module.exports = {
  
};
