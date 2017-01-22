import { Meteor } from "meteor/meteor";

if(Media.find().count() === 0) {
	var data = [
		{
			"type": "text",
			"services": {},
			"name": "Survival of the Sickest",
			"creator": "Sharon Moalem"
		},
		{
			"type": "audio",
			"services": {
				"spotify": "https://play.spotify.com/track/1sH2GeOsLFEw714Otu8P9i"
			},
			"name": "Fiona Coyne",
			"creator": "Skylar Spence",
			"album": "Fiona Coyne/Fall Harder"
		},
		{
			"type": "video",
			"services": {
				"youtube": "https://www.youtube.com/watch?v=ebILIKHi9wo"
			},
			"name": "Delta Heavy - White Flag (Official Video)",
			"creator": "DeltaHeavyVevo"
		}
	];
	data.forEach(function(doc) {
		Media.insert(doc);
	});
}

if(Services.find().count() === 0) {
	var data = [
		{
			"type": "video",
			"name": "youtube",
			"identityRegexes": ["youtube\\.com|youtu\\.be"],
			"urlRegex": '(?:youtube\\.com.*?\\Wvi?[=\/]|youtu\\.be\\/)([A-z0-9-]*)'
		},
		{
			"type": "audio",
			"name": "spotify",
			"identityRegexes": [],
			"urlRegex": ""
		}
	];
	data.forEach(function(doc) {
		Services.insert(doc);
	});
}
