import Button from '@enact/sandstone/Button';
import { Header, Panel } from '@enact/sandstone/Panels';
import { useCallback, useEffect, useRef } from 'react';
import Hls from 'hls.js';
import css from '../../App/App.module.less';

interface PlayerPanelProps {
    episode: any;
    movie: any;
    onBack: () => void;
}

const PlayerPanel = ({ episode, movie, onBack, ...rest }: PlayerPanelProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const hlsRef = useRef<Hls | null>(null);

    const streamUrl = episode?.stream_links?.[0]?.url;

    useEffect(() => {
        console.log('PlayerPanel: useEffect triggered');
        console.log('PlayerPanel: streamUrl:', streamUrl);
        console.log('PlayerPanel: videoRef.current:', videoRef.current);

        if (!streamUrl || !videoRef.current) {
            console.log('PlayerPanel: Missing streamUrl or videoRef');
            return;
        }

        const video = videoRef.current;
        console.log('PlayerPanel: Video element:', video);

        // Clean up previous HLS instance
        if (hlsRef.current) {
            console.log('PlayerPanel: Destroying previous HLS instance');
            hlsRef.current.destroy();
            hlsRef.current = null;
        }

        if (Hls.isSupported()) {
            console.log('PlayerPanel: HLS is supported, creating instance');
            const hls = new Hls({
                enableWorker: true,
                lowLatencyMode: true,
            });

            hlsRef.current = hls;
            hls.loadSource(streamUrl);
            hls.attachMedia(video);

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                console.log('PlayerPanel: HLS manifest parsed');
                video.play().catch((err) => {
                    console.error('Auto-play failed:', err);
                });
            });

            hls.on(Hls.Events.ERROR, (event, data) => {
                console.error('HLS error:', data);
                if (data.fatal) {
                    switch (data.type) {
                        case Hls.ErrorTypes.NETWORK_ERROR:
                            console.error('Network error, trying to recover...');
                            hls.startLoad();
                            break;
                        case Hls.ErrorTypes.MEDIA_ERROR:
                            console.error('Media error, trying to recover...');
                            hls.recoverMediaError();
                            break;
                        default:
                            console.error('Fatal error, cannot recover');
                            hls.destroy();
                            break;
                    }
                }
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            console.log('PlayerPanel: Using native HLS support');
            // Native HLS support (Safari)
            video.src = streamUrl;
            video.addEventListener('loadedmetadata', () => {
                video.play().catch((err) => {
                    console.error('Auto-play failed:', err);
                });
            });
        } else {
            console.error('PlayerPanel: HLS not supported!');
        }

        return () => {
            if (hlsRef.current) {
                console.log('PlayerPanel: Cleanup - destroying HLS');
                hlsRef.current.destroy();
                hlsRef.current = null;
            }
        };
    }, [streamUrl]);

    const handleBack = useCallback(() => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
        onBack();
    }, [onBack]);

    return (
        <Panel {...rest}>
            <Header
                title={`${movie?.name || 'Movie'} - Episode ${episode?.name || ''}`}
                subtitle={`Movies > ${movie?.name || 'Detail'} > Episode ${episode?.name || ''}`}
                slotBefore={<Button icon="arrowlargeleft" onClick={handleBack} />}
            />
            <div className={css.playerContainer}>
                <video
                    ref={videoRef}
                    className={css.player}
                    controls
                    style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: '#000'
                    }}
                />
            </div>
        </Panel>
    );
};

export default PlayerPanel;
