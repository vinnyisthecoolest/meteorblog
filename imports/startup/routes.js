import { Router } from 'meteor/iron:router';

import '../ui/body.js';

Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});
