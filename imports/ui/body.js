import './body.html';

import './blog.js';

Template.body.onCreated(function bodyOnCreated() {
  Meteor.subscribe('blogs');
});
