import { Template } from 'meteor/templating';

import { Blogs } from '../api/blogs.js';

import './blog.html';

Template.blogs.helpers({
  'blog'() {
    return Blogs.find({}, {sort: {createdAt: -1}});
  }
});


