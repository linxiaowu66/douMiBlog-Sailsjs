module.exports = {

  attributes: {
    nickname: {
      type: 'string',
      defaultsTo: '匿名用户',
      unique: true
    },
    email:'string',
    website: 'string',
    content: 'string',
    createDate: {
      type: 'string',
      columnType: 'datetime'
    },
    response: {
      model: 'comments',
      collection: 'comments',
      via: 'response'
    }
  },
};
