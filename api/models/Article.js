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
      maxLength: 40,
      defaultsTo: 'untitled'
    },
    content: {
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
      maxLength: 200
    },
    articleStatus: {
      type: 'string',
      enum: ['drafted', 'published']
    },
    /*Add these three attributes only for updating
      the counts of blog which in the Tags/Archive/Category/User Model
    */
    tagsArray:  {
      type: 'array'
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
      required: true
    },
    /*article to category is a one-to-many association*/
    category: {
      model: 'category',
      required: true
    }

  },

  /*After creating the article, we need to update the
    counts of tags/category/archive model*/
  afterCreate: function (article, cb) {

  },

};
