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
	}
});
