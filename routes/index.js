var express = require('express');
var router = express.Router();

var POSTS=[]
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create',(req,res)=>{
  res.render('create')
})
router.post('/create',(req,res)=>{
  const post={
    ...req.body,
    date:new Date(),
    like:0
  }
  POSTS.push(post)
  res.redirect('/read')
})
router.get('/update/:index', (req, res) => {
  const index = req.params.index;
  const post = POSTS[index];
  res.render('update', { index, post }); 
});

router.post('/update/:idx', (req, res) => {
  const index = req.params.idx;
  const existingPost = POSTS[index]; 
  const post = {
...req.body,
date:new Date(),
    like: existingPost.like 

  };

  POSTS[index] = post;

  res.redirect('/read');
});
router.get('/delete/:index',(req,res)=>{
  const index=req.params.index
  POSTS.splice(index,1)
  res.redirect('/read')
})
router.get('/read',(req,res)=>{
  res.render('read',{posts:POSTS})
})
module.exports = router;
