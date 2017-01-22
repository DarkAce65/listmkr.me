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
	}
});
