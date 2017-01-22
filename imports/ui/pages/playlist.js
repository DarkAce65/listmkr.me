import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";

import "./playlist.html";

Template.playlist.onRendered(function() {
	Meteor.subscribe("playlist", FlowRouter.getParam("id"));
	Meteor.subscribe("mediaList", FlowRouter.getParam("id"));
});

Template.playlist.helpers({
	"playlist": function() {
		var list = Lists.findOne(FlowRouter.getParam("id"));
		if(list) {
			return list;
		}
		return {};
	},
	"items": function() {
		var list = Lists.findOne(FlowRouter.getParam("id"));
		if(list) {
			return list.items.map(function(value) {
				var media = Media.findOne(value);
				if(media) {
					return media;
				}
				return {"name": "Unknown", "creator": "Unknown"};
			});
		}
		return [];
	}
});
