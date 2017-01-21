import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";

import "./playlist.html";

Template.body.helpers({
	"items": function() {
		var list = Lists.findOne(FlowRouter.getParam("id"));
		if(list) {
			return list.items;
		}
		return [];
	}
});
