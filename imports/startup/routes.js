import { Router } from 'meteor/iron:router';

import { Blogs } from '../api/blogs.js';

import '../ui/body.js';

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/blog/:_id', {
  template: 'blogPage',
  data() {
    const currentBlog = this.params._id;
    return Blogs.findOne({_id: currentBlog})
  }
});

Router.route('/myBlog', {
  onBeforeAction: function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      this.next();
    } else {
      this.render("home");
    }
  }
});

Router.route('/myBlog/:_id', {
  template: 'editBlog',
  data() {
    const currentBlog = this.params._id;
    return Blogs.findOne({_id: currentBlog})
  }
});
