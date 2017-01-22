import { Meteor } from "meteor/meteor";

if(Media.find().count() === 0) {
	var data = [
		{
			"type": "text",
			"service": "",
			"name": "Survival of the Sickest",
			"creator": "Sharon Moalem"
		},
		{
			"type": "audio",
			"service": "spotify",
			"url": "https://play.spotify.com/track/1sH2GeOsLFEw714Otu8P9i",
			"name": "Fiona Coyne",
			"creator": "Skylar Spence",
			"album": "Fiona Coyne/Fall Harder"
		},
		{
			"type": "video",
			"service": "youtube",
			"url": "https://www.youtube.com/watch?v=ebILIKHi9wo",
			"name": "Delta Heavy - White Flag (Official Video)",
			"creator": "DeltaHeavyVevo"
		}
	];
	data.forEach(function(doc) {
		Media.insert(doc);
	});
}
