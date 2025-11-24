import { Panels } from '@enact/sandstone/Panels';
import { useState } from 'react';

import MovieList from './MovieList';
import DetailPanel from './DetailPanel';

const MoviePanel = (props: any) => {
    const [index, setIndex] = useState(0);
    const [selectedMovie, setSelectedMovie] = useState<any>(null);

    const handleSelectMovie = (movie: any) => {
        setSelectedMovie(movie);
        setIndex(1);
    };

    const handleBack = () => {
        setIndex(0);
    };

    return (
        <Panels index={index} onBack={handleBack} {...props}>
            <MovieList onSelectMovie={handleSelectMovie} />
            <DetailPanel movie={selectedMovie} onBack={handleBack} />
        </Panels>
    );
};

export default MoviePanel;
