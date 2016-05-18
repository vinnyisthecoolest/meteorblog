import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Blogs = new Mongo.Collection('blogs');

if (Meteor.isServer) {
  Meteor.publish('blogs', function() {
    const currentUser = this.userId;
    return Blogs.find();
  });
}

Meteor.methods({
  'createBlogItem'(blogTitle, blogContent){
    check(blogTitle, String);
    check(blogContent, String);
    const currentUser = Meteor.userId();
    if (!currentUser) {
      throw new Meteor.Error("not-logged-in", "You're not logged in.");
    }
    return Blogs.insert({
      title: blogTitle,
      content: blogContent,
      author: Meteor.user().username,
      createdBy: currentUser,
      createdAt: new Date()
    });
  },
  'deleteBlogItem'(documentId){
    const currentUser = Meteor.userId();
    if(!currentUser){
        throw new Meteor.Error("not-logged-in", "You're not logged in.");
    }
    Blogs.remove({_id: documentId});
  },
  'updateBlogItem'(documentId, blogTitle, blogContent){
    check(blogTitle, String);
    check(blogContent, String);
    const currentUser = Meteor.userId();
    if(!currentUser){
      throw new Meteor.Error("not-logged-in", "You're not logged in.");
    }
    Blogs.update({_id: documentId}, {$set: {title: blogTitle, content: blogContent}});
  }
});
