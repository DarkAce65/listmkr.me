import { Meteor } from "meteor/meteor";

function parseService(url, services) {
	for(var i = 0; i < services.length; i++) {
		for(var r = 0; r < services[i].identityRegexes.length; r++) {
			if(url.match(services[i].identityRegexes[r])) {
				return services[i];
			}
		}
	}

	return {name: "unknown"};
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
		var list = Lists.findOne(listId);
		if(!list) {
			throw new Meteor.Error(404, "List not found.");
		}
		if(list.owner !== this.userId) {
			throw new Meteor.Error(401, "You don't own this list.");
		}
		if(type !== "text" && type !== "audio" && type !== "video") {
			throw new Meteor.Error(400, "Invalid type.");
		}
		var services = Services.find({"type": type}).fetch();
		var service = parseService(url, services);
		var store = url;
		if(service.name !== "unknown") {
			if(service.urlRegex) {
				var mediaId = url.match(service.urlRegex);
				if(mediaId.length >= 2) {
					store = mediaId[1];
				}
			}
		}
		var q = {};
		q["services." + service.name] = store;
		var m = Media.findOne(q);
		if(m) {
			Lists.update(listId, {$set: {"updatedAt": new Date()}, $push: {"items": m._id}});
			console.log("exists, update list");
		}
		else {
			if(service.name !== "unknown") {
				// Query service for information
				console.log("query for info");
				var media = {
					"type": type,
					"services": {},
					"name": url,
					"creator": ""
				};
				media.services[service.name] = store;
			}
			else {
				// Ask user for information
				console.log("ask for info");
				var media = {
					"type": type,
					"services": {},
					"name": url,
					"creator": ""
				};
				media.services[service.name] = store;
			}
			Media.insert(media, function(error, id) {
				Lists.update(listId, {$set: {"updatedAt": new Date()}, $push: {"items": id}});
				console.log("didn't exist, update list");
			});
		}
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
