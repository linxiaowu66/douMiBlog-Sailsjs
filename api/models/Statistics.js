
/**
 * Archive.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    totalVisitCounts: {
      type: 'integer',
      defaultsTo: 0
    },
    todayVisitCounts: {
      type: 'integer',
      defaultsTo: 0
    },
    key: {
      type: 'integer',
      defaultsTo: 0
    }
  },
};

