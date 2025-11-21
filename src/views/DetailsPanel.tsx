import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import { Header, Panel } from '@enact/sandstone/Panels';
import { useEffect, useRef } from 'react';

interface DetailsPanelProps {
	onBack?: () => void;
}

const DetailsPanel = kind<DetailsPanelProps>({
	name: 'DetailsPanel',

	render: ({ onBack, ...props }) => {
		const videoRef = useRef<HTMLVideoElement>(null);

		useEffect(() => {
			const video = videoRef.current;
			if (!video) return;

			const streamUrl = "https://pop2-ec2-ateme.tv360.vn/tok_eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOiIxNzYzNjMwMDA3Iiwic2lwIjoiIiwicGF0aCI6Ii9saXZlL2Vkcy8xOTIvSExTX0NsZWFuX01ITl8ycy8iLCJzZXNzaW9uX2Nkbl9pZCI6IjNjYjRhMjJkMmFhNjVmODMiLCJzZXNzaW9uX2lkIjoiIiwiY2xpZW50X2lkIjoiIiwiZGV2aWNlX2lkIjoiIiwibWF4X3Nlc3Npb25zIjowLCJzZXNzaW9uX2R1cmF0aW9uIjowLCJ1cmwiOiJodHRwczovLzE3Mi4yNC4xNjguMTY0Iiwic2Vzc2lvbl90aW1lb3V0IjowLCJhdWQiOiIxMSIsInNvdXJjZXMiOlsxOTgsNDYyLDQ2NSw0NjldfQ==._5SanDSl8lp-JQ8MZa1ladHVtq4RJzajYcw7whMTKC2rEUM9AP7yT1x9MRBQCwpbXd9J-16dDzzq-KU1ZSwlxQ==/live/eds/192/HLS_Clean_MHN_2s/index.m3u8?uid=19821352";

			// Try using HLS.js if available
			if (video.canPlayType && video.canPlayType('application/vnd.apple.mpegurl')) {
				// Native HLS support (Safari, some WebOS versions)
				console.log('Using native HLS support');
				video.src = streamUrl;
			} else {
				// Try loading with fetch and blob for better compatibility
				console.log('Attempting to load HLS stream with fetch');
				fetch(streamUrl, { 
					mode: 'cors',
					credentials: 'include',
					headers: {
						'User-Agent': 'Mozilla/5.0'
					}
				})
					.then(response => response.text())
					.then(manifestText => {
						console.log('Manifest loaded successfully');
						// Create a blob URL from the manifest
						const blob = new Blob([manifestText], { type: 'application/vnd.apple.mpegurl' });
						const blobUrl = URL.createObjectURL(blob);
						video.src = blobUrl;
					})
					.catch(error => {
						console.error('Failed to fetch manifest:', error);
						// Fallback: try direct URL
						video.src = streamUrl;
					});
			}
		}, []);

		return (
			<Panel {...props}>
				<Header title="Details Panel" />
				<div style={{ padding: '20px' }}>
					<p>This is the details panel with more information.</p>
					<Button onClick={onBack}>Go Back to Main</Button>
				</div>
				<div style={{ padding: '20px', width: '100%', height: '400px' }}>
					<video
						ref={videoRef}
						style={{ width: '100%', height: '100%', backgroundColor: '#000' }}
						controls
						autoPlay
						crossOrigin="anonymous"
						onError={(e) => {
							const video = e.currentTarget;
							const errorCode = video.error?.code;
							const errorMessage = video.error?.message;
							console.error('=== VIDEO ERROR ===');
							console.error('Error Code:', errorCode);
							console.error('Error Message:', errorMessage);
							console.error('Video readyState:', video.readyState);
							console.error('Video networkState:', video.networkState);
							console.error('Current Source:', video.currentSrc);
							
							const errorNames: Record<number, string> = {
								1: 'ABORTED',
								2: 'NETWORK',
								3: 'DECODE',
								4: 'SRC_NOT_SUPPORTED'
							};
							console.error('Error Type:', errorCode ? errorNames[errorCode] : 'UNKNOWN');
						}}
						onLoadedMetadata={() => {
							console.log('Video metadata loaded successfully');
						}}
					/>
				</div>
			</Panel>
		);
	}
});

export default DetailsPanel;
