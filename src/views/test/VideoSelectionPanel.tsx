import { handle } from '@enact/core/handle';
import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import { Header, Panel } from '@enact/sandstone/Panels';
import RadioItem from '@enact/sandstone/RadioItem';
import Scroller from '@enact/sandstone/Scroller';
import Group from '@enact/ui/Group';

import videos from '../../data/videos';

import css from './VideoSelectionPanel.module.less';

// Remap our titles from `videos` to strings in a new array
// videos[{title: 'value'}] -> videosList['value']
const videosList = videos.map((video: any) => video.title);

interface VideoSelectionPanelProps {
	/**
	 * A function to hide the Panels.
	 */
	onHidePanels?: () => void;

	/**
	 * A function that receives the selected video's index.
	 */
	onVideoIndexChange?: (index: number) => void;

	/**
	 * A title string appear on header
	 */
	title?: string;

	/**
	 * The index number of the selected video.
	 */
	videoIndex?: number;
}

const VideoSelectionPanel = kind<VideoSelectionPanelProps>({
	name: 'VideoSelectionPanel',

	handlers: {
		onVideoIndexChange: handle(
			(ev: { selected: number }, { onVideoIndexChange }: VideoSelectionPanelProps) => {
				if (onVideoIndexChange) {
					onVideoIndexChange(ev.selected);
				}
			}
		)
	},

	render: ({ title, onHidePanels, onVideoIndexChange, videoIndex = 0, ...rest }: VideoSelectionPanelProps) => {
		return (
			<Panel {...rest} className={css.videoSelectionPanel}>
				<Header title="Select Video">
					<Button onClick={onHidePanels} size="small">Hide Panels</Button>
				</Header>
				<Scroller>
					<Group
						childComponent={RadioItem}
						selected={videoIndex}
						onSelect={onVideoIndexChange}
						select="radio"
						selectedProp="selected"
					>
						{videosList}
					</Group>
				</Scroller>
			</Panel>
		);
	}
});

export default VideoSelectionPanel;
