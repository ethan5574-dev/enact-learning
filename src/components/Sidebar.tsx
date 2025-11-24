import kind from '@enact/core/kind';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import css from './Sidebar.module.less';

interface SidebarProps {
	activePanel?: string;
	onSelectPanel?: (panel: string) => void;
}

const Sidebar = kind<SidebarProps>({
	name: 'Sidebar',

	styles: {
		css,
		className: 'sidebar'
	},

	render: ({ activePanel = 'main', onSelectPanel, ...props }) => (
		<Scroller {...props}>
			<div className={css.sidebarTitle}>Navigation</div>
			<Item
				label="Go to Main View"
				onClick={() => onSelectPanel && onSelectPanel('main')}
				selected={activePanel === 'main'}
				slotBefore={<Icon>home</Icon>}
			>
				Main
			</Item>
			<Item
				label="View Details"
				onClick={() => onSelectPanel && onSelectPanel('details')}
				selected={activePanel === 'details'}
				slotBefore={<Icon>info</Icon>}
			>
				Details
			</Item>
		</Scroller>
	)
});

export default Sidebar;
