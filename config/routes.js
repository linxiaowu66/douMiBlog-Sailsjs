/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'index',
  },
  /*Auth Route controller*/
  'GET /login': {
    controller: 'Auth',
    action: 'toLogin'
  },

  'POST /login': {
    controller: 'Auth',
    action: 'processLogin'
  },

  'GET /register': {
    controller: 'Auth',
    action: 'toRegister'
  },

  'POST /register': {
    controller: 'Auth',
    action: 'processRegister'
  },

  'GET /logout': {
    controller: 'Auth',
    action: 'logout'
  },
  /*End for Auth route controller*/

  /*Blog backend management route*/
  'GET /douMi': {
    controller: 'Article',
    action: 'index'
  },

  'GET /douMi/editor': {
    controller: 'Article',
    action: 'articleEdit'
  },

  'GET /douMi/:id': {
    controller: 'Article',
    action: 'show'
  },

  'GET /douMi/editor/:id': {
    controller: 'Article',
    action: 'articleEdit'
  },

  'POST /douMi/saveDraft': {
    controller: 'Article',
    action: 'saveDraft'
  },

  'POST /douMi/doPublish': {
    controller: 'Article',
    action: 'publish'
  },

  'GET /douMi/delete/:id': {
    controller: 'Article',
    action: 'delete'
  },

  'POST /douMi/updatePub': {
    controller: 'Article',
    action: 'updatePub'
  },

  'POST /douMi/undoPublish': {
    controller: 'Article',
    action: 'undoPub'
  },
  /*End for Blog backend management route*/

  /*Blog fontend route*/
  'GET /home': {
    controller: 'Home',
    action: 'index'
  },

  'GET /home/:url': {
    controller: 'Home',
    action: 'showOneArticle'
  },


  'GET /home/category/:url': {
    controller: 'Home',
    action: 'showOneCategory'
  },


  'GET /home/tag/:url': {
    controller: 'Home',
    action: 'showOneTag'
  },


  'GET /home/archive/:url': {
    controller: 'Home',
    action: 'showOneArchive'
  },


  /*End for blog frontend route*/

  'GET /aboutDouMi': {
    view: 'aboutDouMi',
  },



  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
