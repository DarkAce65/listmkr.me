import { Meteor } from "meteor/meteor";

Meteor.publish("lists", function() {
	return Lists.find({$or: [{owner: this.userId}, {private: false}]});
});

Meteor.publish("playlist", function(listId) {
	return Lists.find(listId, {limit: 1});
});

Meteor.publish("media", function() {
	return Media.find();
});

Meteor.publish("services", function() {
	return Services.find();
});
