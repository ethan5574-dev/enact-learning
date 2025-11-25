import { Panels } from '@enact/sandstone/Panels';
import { Component } from 'react';

import MovieList from './MovieList';
import DetailPanel from './DetailPanel';
import PlayerPanel from './PlayerPanel';

interface MoviePanelState {
    selectedMovie: any;
    selectedEpisode: any;
    path: string;
}

class MoviePanel extends Component<any, MoviePanelState> {
    constructor(props: any) {
        super(props);
        this.state = {
            selectedMovie: null,
            selectedEpisode: null,
            path: '/movie'
        };
    }

    handleSelectMovie = (movie: any) => {
        console.log('MoviePanel: handleSelectMovie called', movie);
        this.setState({
            selectedMovie: movie,
            path: '/movie/detail'
        });
    };

    handleSelectEpisode = (episode: any) => {
        console.log('MoviePanel: handleSelectEpisode called', episode);
        this.setState({
            selectedEpisode: episode,
            path: '/movie/detail/player'
        });
    };

    handleNavigate = ({ path }: { path: string }) => {
        console.log('MoviePanel: Navigating to', path);
        this.setState({ path });
    };

    handleBack = () => {
        const { path } = this.state;
        console.log('MoviePanel: handleBack called, current path:', path);

        if (path === '/movie/detail/player') {
            this.setState({ path: '/movie/detail' });
        } else if (path === '/movie/detail') {
            this.setState({ path: '/movie' });
        }
    };

    render() {
        const { selectedMovie, selectedEpisode, path } = this.state;

        return (
            <Panels index={path === '/movie' ? 0 : path === '/movie/detail' ? 1 : 2} onBack={this.handleBack} {...this.props}>
                <MovieList onSelectMovie={this.handleSelectMovie} />
                <DetailPanel movie={selectedMovie} onBack={this.handleBack} onSelectEpisode={this.handleSelectEpisode} />
                <PlayerPanel episode={selectedEpisode} movie={selectedMovie} onBack={this.handleBack} />
            </Panels>
        );
    }
}

export default MoviePanel;
