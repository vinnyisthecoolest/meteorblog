import { Router } from 'meteor/iron:router';

import '../ui/body.js';

Router.route('/', {
  name: 'home',
  template: 'home'
});
