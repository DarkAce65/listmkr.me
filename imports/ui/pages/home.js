import { Template } from "meteor/templating";
import { Tracker } from "meteor/tracker";
import { Accounts } from 'meteor/accounts-base';

import "./home.html";

Template.home.onCreated(function() {
	Meteor.subscribe("lists");
	Meteor.subscribe("media");
	Meteor.subscribe("services");
});

Template.home.helpers({
	playlists: function() {
		var lists = Lists.find({}, {sort: {"updatedAt": -1}}).fetch();
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

Template.home.events({
	"click #login": function(e) {
		var username = prompt("Please enter your username");
		var password = prompt("Please enter your password");
		Accounts.createUser({username: username, password: password});
	},
	"click #addPlaylist": function() {
		if(Meteor.userId()) {
			var name = prompt("Please enter a name for your list");
			Meteor.call("createPlaylist", name, false, function(error, data) {
				FlowRouter.go("playlist", {id: data});
			});
		}
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
