import { Template } from "meteor/templating";
import { FlowRouter } from "meteor/kadira:flow-router";

import "./funEnter.html";

Template.fun.events({
	'click #enter': function() {
		FlowRouter.go("fun");
	}
})