import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';

import css from './Sidebar.module.less';

interface SidebarProps {
	activePanel?: string;
	onSelectPanel?: (panel: string) => void;
}

const Sidebar = kind<SidebarProps>({
	name: 'Sidebar',

	render: ({activePanel = 'main', onSelectPanel, ...props}) => (
		<div className={css.sidebar} {...props}>
			<div className={css.sidebarTitle}>Navigation</div>
			<Button
			
				onClick={() => onSelectPanel && onSelectPanel('main')}
				className={activePanel === 'main' ? css.active : ''}
			>
				Main
			</Button>
			<Button
				
				onClick={() => onSelectPanel && onSelectPanel('details')}
				className={activePanel === 'details' ? css.active : ''}
			>
				Details
			</Button>
		</div>
	)
});

export default Sidebar;
