import { Meteor } from "meteor/meteor";

function parseService(url, services) {
	for(var i = 0; i < services.length; i++) {
		for(var r = 0; r < services[r].urlRegexes.length; r++) {
			if(url.match(services[i].urlRegexes[r])) {
				return services[i].name;
			}
		}
	}

	return -1;
}

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
	"addItemToPlaylist": function(listId, url, type) {
		if(!this.userId) {
			throw new Meteor.Error(401, "You are not logged in.");
		}
		if(type !== "text" || type !== "audio" || type !== "video") {
			throw new Meteor.Error(400, "Invalid type.");
		}
		var services = Services.find({"type": type}).fetch().map(function(value) {
			return value.name;
		});
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
	"removeItemFromPlaylist": function(listId, index) {
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
		if(index < 0 || index >= list.items.length) {
			throw new Meteor.Error(400, "Index out of bounds.");
		}
		list.items.splice(index, 1);
		var now = new Date();
		Lists.update(listId, {$set: {"updatedAt": now, "items": list.items}});
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
