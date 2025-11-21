// Simple CORS Proxy Server for HLS Streams
// Run with: node proxy-server.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001;

// Base URL for the stream server
const STREAM_BASE_URL = 'https://hotlivezz179266008.akainu.xyz';

// Enable CORS for all origins
app.use(cors());

// Headers to add to all requests
const getHeaders = () => ({
    'User-Agent': 'Mozilla/5.0 (Web0S; Linux/SmartTV) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.5359.211 Safari/537.36 WebAppManager',
    'Accept': '*/*',
    'Accept-Language': 'en-US',
    'Origin': 'https://demo.zplayer.xyz',
    'Referer': 'https://demo.zplayer.xyz/'
});

// Proxy all requests (manifest and segments)
app.use(async (req, res) => {
    const requestPath = req.path;
    const queryString = req.url.includes('?') ? req.url.substring(req.url.indexOf('?')) : '';
    const targetUrl = STREAM_BASE_URL + requestPath + queryString;

    try {
        console.log('Proxying request to:', targetUrl);

        // Fetch with custom headers
        const response = await fetch(targetUrl, {
            headers: getHeaders()
        });

        if (!response.ok) {
            console.error('Server returned error:', response.status, response.statusText);
            return res.status(response.status).send(`Server error: ${response.statusText}`);
        }

        // Get content type
        const contentType = response.headers.get('content-type');

        // For m3u8 files, modify URLs to point to proxy
        if (contentType && contentType.includes('mpegurl')) {
            let data = await response.text();

            // Replace absolute URLs with proxy URLs
            data = data.replace(/https:\/\/hotlivezz179266008\.akainu\.xyz/g, `http://localhost:${PORT}`);

            res.set('Content-Type', contentType);
            res.set('Access-Control-Allow-Origin', '*');
            res.send(data);
        } else {
            // For video segments, forward binary data
            const buffer = await response.buffer();
            res.set('Content-Type', contentType || 'application/octet-stream');
            res.set('Access-Control-Allow-Origin', '*');
            res.send(buffer);
        }

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).send('Proxy error: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`CORS Proxy server running at http://localhost:${PORT}`);
    console.log(`Proxying all requests to: ${STREAM_BASE_URL}`);
});
