declare module 'flv.js' {
    export interface FlvPlayerConfig {
        type: 'flv' | 'mp4';
        url: string;
        isLive?: boolean;
        cors?: boolean;
        withCredentials?: boolean;
        hasAudio?: boolean;
        hasVideo?: boolean;
        duration?: number;
        filesize?: number;
        segments?: any[];
    }

    export interface FlvPlayer {
        attachMediaElement(mediaElement: HTMLMediaElement): void;
        detachMediaElement(): void;
        load(): void;
        unload(): void;
        play(): Promise<void>;
        pause(): void;
        destroy(): void;
        on(event: string, listener: Function): void;
        off(event: string, listener: Function): void;
    }

    export function createPlayer(config: FlvPlayerConfig, optionalConfig?: any): FlvPlayer;
    export function isSupported(): boolean;
    export function getFeatureList(): any;

    const flvjs: {
        createPlayer: typeof createPlayer;
        isSupported: typeof isSupported;
        getFeatureList: typeof getFeatureList;
    };

    export default flvjs;
}
