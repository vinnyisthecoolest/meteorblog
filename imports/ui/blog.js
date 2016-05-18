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
    Meteor.call('createBlogItem', blogTitle, blogContent, function(error) {
      if (error) {
        console.log(error.reason);
      } else {
        $('[name="blogTitle"]').val('');
        $('[name="blogContent"]').val('');
      }
    });
  }
});

Template.myBlogItem.events({
  'click .delete-blog'() {
    const documentId = this._id;
    const confirm = window.confirm("Delete this blog?");
    if (confirm) {
      Meteor.call('deleteBlogItem', documentId);
    }
  }
});

Template.editBlog.events({
  'submit form'() {
    const documentId = this._id;
    const blogTitle = $('[name="blogTitle"]').val();
    const blogContent = $('[name="blogContent"]').val();
    const confirm = window.confirm("Are you satisfied with your edit?");
    if (confirm) {
      Meteor.call('updateBlogItem', documentId, blogTitle, blogContent);
    }
  }
});
