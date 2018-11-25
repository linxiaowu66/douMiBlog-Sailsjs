
/**
 * Archive.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    totalVisitCounts: {
      type: 'number',
      defaultsTo: 0
    },
    todayVisitCounts: {
      type: 'number',
      defaultsTo: 0
    },
    todayVisitIps: {
      type: 'json',
      columnType: 'array',
      defaultsTo: []
    },
    key: {
      type: 'number',
      defaultsTo: 0
    }
  },
};
