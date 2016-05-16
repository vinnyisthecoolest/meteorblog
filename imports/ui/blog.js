import { Template } from 'meteor/templating';

import { Blogs } from '../api/blogs.js';

import './blog.html';

Template.blogs.helpers({
  'blog'() {
    return Blogs.find({}, {sort: {createdAt: -1}});
  }
});

Template.addBlog.events({
  'submit form'(event) {
     event.preventDefault();
     const blogTitle = $('[name="blogTitle"]').val();
     const blogContent = $('[name="blogContent"]').val();
     Blogs.insert({
       title: blogTitle,
       content: blogContent,
       createdAt: new Date()
     });
     $('[name="blogTitle"]').val('');
     $('[name="blogContent"]').val('');
  }
});
