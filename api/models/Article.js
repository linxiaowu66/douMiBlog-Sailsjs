/**
 * Article.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  attributes: {
    title: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 150,
      defaultsTo: 'untitled'
    },
    content: {
      type: 'string',
      required: true,
      minLength: 1
    },
    previewText: {
      type: 'string',
      required: true,
      minLength: 1
    },
    slug: {
      type: 'string',
      required: true,
      minLength: 1
    },
    digest: {
      type: 'string',
      required: true,
      minLength: 1,
      maxLength: 500
    },
    articleStatus: {
      type: 'string',
      isIn: ['drafted', 'published'],
      required: true
    },
    pageViews: {
      type: 'json',
      columnType: 'array'
    },
    pageViewsCount: {
      type: 'number',
      defaultsTo: 0
    },
    author:{
      type: 'string',
      required: true
    },
    picture:{
      type: 'string'
    },
    tagsArray:  {
      type: 'json',
      columnType: 'array'
    },
    /*This parameter is active when the article is in the publish status*/
    archiveTime:{
      type: 'string',
    },

    /*Article to user is a many-to-many association*/
    owner: {
      model: 'user',
      required: true
    },
    /*Article to tags is a many-to-many association*/
    tags: {
      collection: 'Tags',
      via: 'articles',
      dominant: true
    },
    /*article to archive is a one-to-many association*/
    archive: {
      model: 'archive',
    },
    /*article to category is a one-to-many association*/
    category: {
      model: 'category',
      required: true
    }

  },

};
