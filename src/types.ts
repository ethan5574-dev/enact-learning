import { ReactNode } from 'react';

export interface Subtitle {
    file: string;
    lang: string;
}

export interface Video {
    title: string;
    poster: string;
    source: string;
    subtitles: Subtitle[];
    type: string;
    desc: string;
}

// Augment Enact's VideoPlayer types to include missing props
declare module '@enact/sandstone/VideoPlayer' {
    export interface VideoPlayerProps {
        infoComponents?: ReactNode;
        spotlightDisabled?: boolean;
    }
}
