import Button from '@enact/sandstone/Button';
import { MediaControls } from '@enact/sandstone/MediaPlayer';
import { Panels } from '@enact/sandstone/Panels';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import VideoPlayer from '@enact/sandstone/VideoPlayer';
import { Cell, Layout } from '@enact/ui/Layout';
import Hls from 'hls.js';
import flvjs from 'flv.js';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useRef, useState } from 'react';

import Sidebar from '../components/Sidebar';
import VideoSelectionPanel from '../views/VideoSelectionPanel';

import videos from './videos';

import css from './App.module.less';

const getVideo = (index: number) => videos[index];

interface AppBaseProps {
	className?: string;
	videoId?: number;
}

const AppBase = ({ className = '', videoId = 0, ...rest }: AppBaseProps) => {
	const [videoIndex, setVideoIndex] = useState<number>(videoId);
	const [videoPanelsVisible, setVideoPanelsVisible] = useState<boolean>(false);
	const hlsRef = useRef<Hls | null>(null);
	const flvPlayerRef = useRef<any>(null); // flv.js player instance
	const videoRef = useRef<any>(null); // VideoPlayer ref type from Enact

	const [activePanel, setActivePanel] = useState<string>('main');

	const handleNavigate = useCallback((panel: string) => {
		setActivePanel(panel);
		// Logic to handle navigation if needed, e.g. routing or just state change
	}, []);

	const getHls = (): Hls => {
		if (hlsRef.current === null) {
			hlsRef.current = new Hls();
		}
		return hlsRef.current;
	};

	const configureHlsWithHeaders = (hls: Hls, headers?: Record<string, string>) => {
		if (headers) {
			hls.config.xhrSetup = (xhr: XMLHttpRequest) => {
				Object.keys(headers).forEach(key => {
					xhr.setRequestHeader(key, headers[key]);
				});
			};
		}
	};

	const handleHideVideoPanelsClick = useCallback(() => setVideoPanelsVisible(false), []);

	const handleShowVideoPanelsClick = useCallback(() => {
		videoRef.current?.hideControls();
		setVideoPanelsVisible(true);
	}, []);

	const handleVideoIndexChange = useCallback((index: number) => {
		setVideoIndex(index);
	}, []);

	const currentVideo = getVideo(videoIndex);
	const { desc, source, type, headers, ...restVideo } = currentVideo as any;

	// Get video source depending on video type
	useEffect(() => {
		const hls = getHls();
		const videoElement = videoRef.current?.getVideoNode().media;

		if (!videoElement) return;

		// Cleanup previous players
		if (flvPlayerRef.current) {
			flvPlayerRef.current.destroy();
			flvPlayerRef.current = null;
		}

		if (type === 'application/x-mpegURL') {
			// HLS stream
			configureHlsWithHeaders(hls, headers);
			hls.loadSource(source);
			hls.attachMedia(videoElement);
		} else if (type === 'video/x-flv') {
			// FLV stream
			hls.detachMedia();
			if (flvjs.isSupported()) {
				flvPlayerRef.current = flvjs.createPlayer({
					type: 'flv',
					url: source,
					isLive: true
				});
				flvPlayerRef.current.attachMediaElement(videoElement);
				flvPlayerRef.current.load();
			}
		} else {
			// Regular video (mp4, etc.)
			hls.detachMedia();
			videoElement.src = source;
		}

		// Cleanup on unmount
		return () => {
			if (flvPlayerRef.current) {
				flvPlayerRef.current.destroy();
				flvPlayerRef.current = null;
			}
		};
	}, [source, type]);



	let content: JSX.Element | null = null;

	if (videoPanelsVisible) {
		content = (
			<Panels onClose={handleHideVideoPanelsClick}>
				<VideoSelectionPanel
					onHidePanels={handleHideVideoPanelsClick}
					onVideoIndexChange={handleVideoIndexChange}
					title="Videos"
					videoIndex={videoIndex}
				/>
			</Panels>
		);
	}

	return (
		<div {...rest} className={className + ' ' + css.app}>
			<Layout orientation="horizontal" className={css.layout}>
				{(
					<Cell shrink>
						<Sidebar activePanel={activePanel} onSelectPanel={handleNavigate} />
					</Cell>
				) as any}
				{(
					<Cell className={css.content}>
						{activePanel === 'main' ? (
							<>
								<VideoPlayer
									{...restVideo}
									className={css.player + ' enact-fit'}
									ref={videoRef}
									infoComponents={desc}
									spotlightDisabled={videoPanelsVisible}
								>
									<source src={source} type={type} />
									<MediaControls id="mediaControls" actionGuideLabel="Press Down Button">
										<Button
											icon="list"
											backgroundOpacity="transparent"
											onClick={handleShowVideoPanelsClick}
											spotlightDisabled={videoPanelsVisible}
										/>
									</MediaControls>
								</VideoPlayer>
								{content}
							</>
						) : (
							<div className={css.detailsPlaceholder}>Details View Placeholder</div>
						)}
					</Cell>
				) as any}
			</Layout>
		</div>
	);
};

AppBase.propTypes = {
	/**
	 * Assign an alternate initial video to load first.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	videoId: PropTypes.number
};

AppBase.defaultProps = {
	videoId: 0
};

const App = ThemeDecorator(AppBase);

export default App;
export { App, AppBase };
