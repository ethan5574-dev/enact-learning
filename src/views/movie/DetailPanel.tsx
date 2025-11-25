import Button from '@enact/sandstone/Button';
import { Header, Panel } from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Image from '@enact/sandstone/Image';
import BodyText from '@enact/sandstone/BodyText';
import ri from '@enact/ui/resolution';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Spinner from '@enact/sandstone/Spinner';

interface StreamLink {
    id: string;
    name: string;
    type: string;
    default: boolean;
    url: string;
    request_headers?: { key: string; value: string }[];
}

interface Stream {
    id: string;
    name: string;
    stream_links: StreamLink[];
}

interface Content {
    id: string;
    name: string;
    grid_number: number;
    streams: Stream[];
}

interface Source {
    id: string;
    name: string;
    contents: Content[];
}

interface MovieDetailData {
    tags: { text: string; type: string; url: string }[];
    sources: Source[];
    subtitle: string;
}

interface DetailPanelProps {
    movie: any;
    onBack: () => void;
    onSelectEpisode?: (episode: any) => void;
}

const fetchMovieDetail = async (url: string): Promise<MovieDetailData> => {
    const response = await axios.get(url);
    return response.data;
};

const DetailPanel = ({ movie, onBack, onSelectEpisode, ...rest }: DetailPanelProps) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['movieDetail', movie?.id],
        queryFn: () => fetchMovieDetail(movie?.remote_data?.url),
        enabled: !!movie?.remote_data?.url,
        staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    });

    const episodes = data?.sources?.[0]?.contents?.[0]?.streams || [];


    return (
        <Panel {...rest}>
            <Header
                title={movie?.name || 'Movie Details'}
                subtitle={`Movies > ${movie?.name || 'Detail'}`}
                slotBefore={<Button icon="arrowlargeleft" onClick={onBack} />}
            />
            <Scroller>
                <div style={{ padding: ri.scale(24) }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: ri.scale(24) }}>
                        {movie?.image?.url && (
                            <Image
                                src={movie.image.url}
                                style={{
                                    width: ri.scale(300),
                                    height: ri.scale(400),
                                    flexShrink: 0
                                }}
                            />
                        )}
                        <div style={{ flex: 1 }}>
                            <BodyText size="large" style={{ fontWeight: 'bold' }}>
                                {movie?.name}
                            </BodyText>
                            {movie?.label?.text && (
                                <BodyText>{movie.label.text}</BodyText>
                            )}
                            <br />
                            <BodyText>{movie?.description}</BodyText>

                            <br />
                            <BodyText size="small" style={{ fontWeight: 'bold', marginTop: ri.scale(24) }}>
                                Remote Data:
                            </BodyText>
                            {isLoading && <Spinner component="div">Loading...</Spinner>}
                            {error && <BodyText>Error loading remote data</BodyText>}

                            {episodes.length > 0 && (
                                <div style={{ marginTop: ri.scale(24) }}>
                                    <BodyText size="small" style={{ fontWeight: 'bold', marginBottom: ri.scale(12) }}>
                                        Episodes:
                                    </BodyText>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: ri.scale(12) }}>
                                        {episodes.map((episode) => (
                                            <Button
                                                key={episode.id}
                                                size="small"
                                                style={{ minWidth: ri.scale(80) }}
                                                onClick={() => {
                                                    if (onSelectEpisode) {
                                                        onSelectEpisode(episode);
                                                    } else {
                                                        console.error('DetailPanel: onSelectEpisode is undefined!');
                                                    }
                                                }}
                                            >
                                                {episode.name}
                                            </Button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Debug data view - keeping it for now but hidden if episodes exist */}
                            {data && !episodes.length && (
                                <pre style={{ fontSize: '0.8em', whiteSpace: 'pre-wrap', maxHeight: ri.scale(300), overflow: 'hidden' }}>
                                    {JSON.stringify(data, null, 2).substring(0, 500)}...
                                </pre>
                            )}
                        </div>
                    </div>
                </div>
            </Scroller>
        </Panel>
    );
};

export default DetailPanel;
