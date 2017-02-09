'user strict';
const STATUS_OK = 0;
const STATUS_ERR = 1;

module.exports = {
  format: function(err, data){
    if (err) {
      return {
        status: STATUS_ERR,
        msg: err.toString()
      };
    }
    const resultType = typeof (data);
    if (resultType === 'object' || resultType === 'string') {
      return {
        status: STATUS_OK,
        data
      };
    }
    return {
      status: STATUS_ERR,
      msg: 'result格式不正确'
    };
  }
}
