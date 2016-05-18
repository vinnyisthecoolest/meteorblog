import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Blogs = new Mongo.Collection('blogs');

if (Meteor.isServer) {
  Meteor.publish('blogs', function() {
    const currentUser = this.userId;
    return Blogs.find();
  });
}
