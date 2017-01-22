import { FlowRouter } from "meteor/kadira:flow-router";
import { BlazeLayout } from "meteor/kadira:blaze-layout";

import "../ui/layout.js"
import "../ui/pages/home.js"
import "../ui/pages/playlist.js"

FlowRouter.route("/", {
	name: "home",
	action: function() {
		BlazeLayout.render("layout", {content: "home"});
	}
});

FlowRouter.route("/playlists/:id", {
	name: "playlist",
	action: function() {
		BlazeLayout.render("layout", {content: "playlist"});
	}
});
