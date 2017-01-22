import { Meteor } from "meteor/meteor";

Meteor.methods({
	"createPlaylist": function(name, prvt) {
		if(!this.userId) {
			throw new Meteor.Error(401, "You are not logged in.");
		}
		if(!prvt) {
			prvt = false;
		}
		var now = new Date();
		var list = {
			"name": name,
			"owner": this.userId,
			"createdAt": now,
			"updatedAt": now,
			"items": [],
			"private": prvt
		}
		Lists.insert(list);
	},
	"addItemToPlaylist": function(listId, mediaId) {
		if(!this.userId) {
			throw new Meteor.Error(401, "You are not logged in.");
		}
		var media = Media.findOne(mediaId);
		if(!media) {
			throw new Meteor.Error(404, "Media not found.");
		}
		var list = Lists.findOne(listId);
		if(!list) {
			throw new Meteor.Error(404, "List not found.");
		}
		if(list.owner !== this.userId) {
			throw new Meteor.Error(401, "You don't own this list.");
		}
		var now = new Date();
		Lists.update(listId, {$set: {"updatedAt": now}, $push: {"items": mediaId}});
	},
	"deletePlaylist": function(listId) {
		if(!this.userId) {
			throw new Meteor.Error(401, "You are not logged in.");
		}
		var list = Lists.findOne(listId);
		if(!list) {
			throw new Meteor.Error(404, "List not found.");
		}
		if(list.owner !== this.userId) {
			throw new Meteor.Error(401, "You don't own this list.");
		}
		Lists.remove(listId);
	}
});
