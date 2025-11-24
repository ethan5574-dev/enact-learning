

// Videos List
const videos = [
	{
		title: 'mp4 Video Source',
		poster: 'http://media.w3.org/2010/05/sintel/poster.png',
		source: 'http://media.w3.org/2010/05/sintel/trailer.mp4',
		subtitles: [],
		type: 'video/mp4',
		desc: 'Custom mp4 video source.'
	},
	{
		title: 'm3u8 Video Source (via Proxy)',
		// Proxy server will add Origin, Referer, User-Agent headers
		source: 'http://localhost:3001/kgBlGCHKf7cfc9RxHCmE-Q/Fv2lucGIbhPi2caWYvF5Lg/1763976950868/live/sd-6MvYM5oPQJVk9UBriX/playlist.m3u8',
		subtitles: [],
		type: 'application/x-mpegURL',
		desc: 'HLS stream via CORS proxy server.'
	},
	{
		title: 'FLV Live Stream',
		source: 'https://2893950149.global.cdnfastest.com/live/692032852f36e_161.flv?expire=1764322565&sign=ea2477f806282de19cdb338ae0423657',
		subtitles: [],
		type: 'video/x-flv',  // FLV mime type
		desc: 'FLV live stream source.'
	}
];

export default videos;
