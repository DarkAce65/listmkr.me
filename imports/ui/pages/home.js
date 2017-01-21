import { Template } from "meteor/templating";

import "./home.html";

Template.body.helpers({
	playlists: [
		{
			"id": "12345",
			"name": "Playlist 01",
			"createdAt": "Sat Jan 21 2017 01:08:18 GMT-0500 (EST)",
			"items": [
				{
					"type": "text",
					"addedOn": "Sat Jan 21 2017 01:08:18 GMT-0500 (EST)",
					"service": "",
					"title": "Survival of the Sickest",
					"author": "Sharon Moalem"
				},
				{
					"type": "audio",
					"addedOn": "Sat Jan 21 2017 01:10:25 GMT-0500 (EST)",
					"service": "spotify",
					"link": "https://play.spotify.com/track/1sH2GeOsLFEw714Otu8P9i",
					"title": "Fiona Coyne",
					"artist": "Skylar Spence",
					"album": "Fiona Coyne/Fall Harder"
				},
				{
					"type": "video",
					"addedOn": "Sat Jan 21 2017 01:11:54 GMT-0500 (EST)",
					"service": "youtube",
					"link": "https://www.youtube.com/watch?v=ebILIKHi9wo",
					"title": "Delta Heavy - White Flag (Official Video)",
					"channel": "DeltaHeavyVevo"
				}
			]
		}
	]
});