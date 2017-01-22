import { Meteor } from "meteor/meteor";

import "../imports/startup/server.js";
import "./methods.js";

Meteor.publish("lists", function() {
	return Lists.find({$or: [{owner: this.userId}, {private: false}]});
});

Meteor.publish("playlist", function(listId) {
	return Lists.find(listId);
});

Meteor.publish("mediaList", function(listId) {
	var list = Lists.findOne(listId);
	if(list) {
		return Media.find({_id: {$in: list.items}});
	}
	return [];
});

Meteor.publish("media", function() {
	return Media.find();
});

Meteor.publish("services", function() {
	return Services.find();
});
