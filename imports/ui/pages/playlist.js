import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";

import "./playlist.html";

Template.playlist.onRendered(function() {
	Meteor.subscribe("playlist", FlowRouter.getParam("id"));
});

Template.playlist.helpers({
	"items": function() {
		var list = Lists.findOne(FlowRouter.getParam("id"));
		if(list) {
			return list.items;
		}
		return [];
	}
});
