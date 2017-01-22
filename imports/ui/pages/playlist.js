import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";

import "./playlist.html";

Template.playlist.onRendered(function() {
	Meteor.subscribe("playlist", FlowRouter.getParam("id"));
	Meteor.subscribe("media");
});

Template.playlist.events({
	"autocompleteselect input": function(event, template, doc){
		var list = Lists.findOne(FlowRouter.getParam("id"));
		Meteor.call("addItemToPlaylist", list._id, doc._id);
	},
	"click #home": function(){
		FlowRouter.go("home");
	},
	"click #add": function(){
		var type = prompt("Enter the type of the item (text, audio, video)");
		var url = prompt("Enter the item's url");
		Meteor.call("addItemToPlaylist", FlowRouter.getParam("id"), url, type);
	},
	"click #delete": function(){
		Meteor.call("deletePlaylist", FlowRouter.getParam("id"), function(error, data) {
			FlowRouter.go("home");
		});
	}
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
