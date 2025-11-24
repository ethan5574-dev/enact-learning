import Button from '@enact/sandstone/Button';
import { Header, Panel } from '@enact/sandstone/Panels';
import Scroller from '@enact/sandstone/Scroller';
import Image from '@enact/sandstone/Image';
import BodyText from '@enact/sandstone/BodyText';
import ri from '@enact/ui/resolution';

interface DetailPanelProps {
    movie: any;
    onBack: () => void;
}

const DetailPanel = ({ movie, onBack, ...rest }: DetailPanelProps) => {
    return (
        <Panel {...rest}>
            <Header
                title={movie?.name || 'Movie Details'}
                subtitle={`Movies > ${movie?.name || 'Detail'}`}
            //slotBefore={<Button icon="arrowlargeleft" onClick={onBack} />}
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
                        <div>
                            <BodyText size="large" style={{ fontWeight: 'bold' }}>
                                {movie?.name}
                            </BodyText>
                            {movie?.label?.text && (
                                <BodyText>{movie.label.text}</BodyText>
                            )}
                            <br />
                            <BodyText>{movie?.description}</BodyText>
                        </div>
                    </div>
                </div>
            </Scroller>
        </Panel>
    );
};

export default DetailPanel;
