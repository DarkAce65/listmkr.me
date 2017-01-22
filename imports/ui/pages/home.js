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

Template.topButtons.events({
	"click #addPlayList": function(){
		if(Meteor.userId()) {
			window.open(playlist.html);
		} else {
			Accounts.createUser(userObject, {
				username: "username",
				password: "password"
			});
		}
	},
	"click #addToPlaylist": function(){
		if(Meteor.userId()) {
			$("#addItem").modal("show");
		} else {
			Accounts.createUser(userObject, {
				username: "username",
				password: "password"
			});
		}
	},
	"click #save": function(e){
		e.preventDefault();
		var name = {
			name: $("#itemName").val()
		};
		var link = {
			link: $("itemLink").val()
		};
		//Meteor.call("addItemToPlaylist", PLAYLISTID, MEDIAID)
		$("#addItem").modal("hide");
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

