const prefix = 'product-service';

const makeMessage = (errorCode, message) => ({
  code: `${prefix}-${errorCode}`,
  message
});

module.exports = {

};
