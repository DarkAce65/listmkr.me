import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";

import "./home.html";

Template.home.onCreated(function() {
	Meteor.subscribe("lists");
	Meteor.subscribe("media");
	Meteor.subscribe("services");
});

Template.home.helpers({
	playlists: function() {
		var lists = Lists.find().fetch();
		if(lists) {
			return lists;
		}
		return [];
	},
	media: function() {
		var media = Media.find().fetch();
		if(media) {
			return media;
		}
		return [];
	}
});


Template.plCover.helpers({
	items: function() {
		var media = Media.find().fetch();
		if(media) {
			var items = this.items.map(function(value) {
				var media = Media.findOne(value);
				if(media) {
					return media;
				}
				return {"name": "Unknown", "creator": "Unknown"};
			});
			return items;
		}
		return [];
	}
});
