'use strict';

const express = require('express');
const wikiRouter = express.Router();
const models = require('../models');
const Page = models.Page; 
const User = models.User; 
module.exports = wikiRouter;

wikiRouter.get('/', function(req, res, next) {
    res.redirect('/')
})

wikiRouter.post('/', function(req, res, next) {

  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`

    var page = Page.build({
        title: req.body.title,
        content: req.body.content
    })



  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  .then( (result) => {
    res.redirect(result.route)
  }
    
  );
  // -> after save -> res.redirect('/');
});

wikiRouter.get('/add', function(req, res, next) {
    res.render('addpage')
})


wikiRouter.get('/:urlTitle', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.urlTitle
          }
      }).then( (currentPage) => {
        console.log(currentPage)
        //res.json(currentPage)
        res.render('wikipage', {page: currentPage})
      })
      .catch(next)
})
