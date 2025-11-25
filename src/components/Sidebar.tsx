import kind from '@enact/core/kind';
import Icon from '@enact/sandstone/Icon';
import Item from '@enact/sandstone/Item';
import Scroller from '@enact/sandstone/Scroller';
import css from './Sidebar.module.less';

interface SidebarProps {
	activePath?: string;
	onNavigate?: (args: { path: string }) => void;
	onMoviePanel?: () => void;
	onTestPanel?: () => void;
}

const Sidebar = kind<SidebarProps>({
	name: 'Sidebar',

	styles: {
		css,
		className: 'sidebar'
	},

	render: ({ activePath = '/movie', onMoviePanel, onTestPanel, ...props }) => (
		<Scroller {...props}>
			<div className={css.sidebarTitle}>Navigation</div>
			<Item
				label="Movie List"
				onClick={() => {
					console.log('Sidebar: Clicked Movie List');
					onMoviePanel && onMoviePanel();
				}}
				selected={activePath?.startsWith('/movie')}
				slotBefore={<Icon>popcorn</Icon>}
			>
				Movie
			</Item>
			<Item
				label="Test Video Player"
				onClick={() => {
					console.log('Sidebar: Clicked Test Video Player');
					onTestPanel && onTestPanel();
				}}
				selected={activePath?.startsWith('/test')}
				slotBefore={<Icon>play</Icon>}
			>
				Test
			</Item>
		</Scroller>
	)
});

export default Sidebar;
