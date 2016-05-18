import { Template } from 'meteor/templating';

import { Blogs } from '../api/blogs.js';

import './blog.html';

Template.blogs.helpers({
  'blog'() {
    return Blogs.find({}, {sort: {createdAt: -1}});
  }
});

Template.myBlogs.helpers({
  'blog'() {
    const currentUser = Meteor.userId();
    return Blogs.find({createdBy: currentUser}, {sort: {createdAt: -1}});
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
       author: Meteor.user().username,
       createdBy: Meteor.userId(),
       createdAt: new Date()
     });
     $('[name="blogTitle"]').val('');
     $('[name="blogContent"]').val('');
  }
});

Template.myBlogItem.events({
  'click .delete-blog'() {
    const documentId = this._id;
    const confirm = window.confirm("Delete this blog?");
    if (confirm) {
      Blogs.remove({_id: documentId});
    }
  }
});
