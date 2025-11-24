import kind from '@enact/core/kind';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import css from './Sidebar.module.less';

interface SidebarProps {
	activePanelIndex?: number;
	onSelectPanel?: (index: number) => void;
}

const Sidebar = kind<SidebarProps>({
	name: 'Sidebar',

	styles: {
		css,
		className: 'sidebar'
	},

	render: ({ activePanelIndex = 0, onSelectPanel, ...props }) => (
		<Scroller {...props}>
			<div className={css.sidebarTitle}>Navigation</div>
			<Item
				label="Movie List"
				onClick={() => onSelectPanel && onSelectPanel(0)}
				selected={activePanelIndex === 0}
				slotBefore={<Icon>popcorn</Icon>}
			>
				Movie
			</Item>
			<Item
				label="Test Video Player"
				onClick={() => onSelectPanel && onSelectPanel(1)}
				selected={activePanelIndex === 1}
				slotBefore={<Icon>play</Icon>}
			>
				Test
			</Item>
		</Scroller>
	)
});

export default Sidebar;
