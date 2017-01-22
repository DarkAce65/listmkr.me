import { Meteor } from "meteor/meteor";

Meteor.methods({
	"createPlaylist": function(prvt) {
		if(!this.userId) {
			throw new Meteor.Error(401, "You are not logged in.");
		}
		var now = new Date();
		var list = {
			"owner": this.userId,
			"createdAt": now,
			"updatedAt": now,
			"items": [],
			"private": prvt
		}
		Lists.insert(list);
	}
});
