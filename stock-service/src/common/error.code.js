const prefix = 'stock-service';

const makeMessage = (errorCode, message) => ({
  code: `${prefix}-${errorCode}`,
  message
});

module.exports = {
  
};
