import ImageItem from '@enact/sandstone/ImageItem';
import { VirtualGridList } from '@enact/sandstone/VirtualList';
import ri from '@enact/ui/resolution';
import channels from '../../data/movie';

const MovieList = ({ onSelectMovie, ...rest }: { onSelectMovie?: (movie: any) => void }) => {
    const renderItem = ({ index, ...restItem }: { index: number }) => {
        const movie = channels[index];
        if (!movie) return null;

        return (
            <ImageItem
                {...restItem}
                key={index}
                label={movie.label?.text}
                src={movie.image?.url}
                onClick={() => onSelectMovie && onSelectMovie(movie)}
            >
                {movie.name}
            </ImageItem>
        );
    };

    return (
        <VirtualGridList
            {...rest}
            dataSize={channels.length}
            itemRenderer={renderItem}
            itemSize={{
                minWidth: ri.scale(300),
                minHeight: ri.scale(400)
            }}
            spacing={ri.scale(20)}
            style={{ height: '100%', width: '100%' }}
        />
    );
};

export default MovieList;
