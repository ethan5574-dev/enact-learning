import kind from '@enact/core/kind';
import Button from '@enact/sandstone/Button';
import {Header, Panel} from '@enact/sandstone/Panels';

interface MainPanelProps {
	onNavigate?: (panel: string) => void;
}

const MainPanel = kind<MainPanelProps>({
	name: 'MainPanel',

	render: ({onNavigate, ...props}) => (
		<Panel {...props}>
			<div style={{padding: '20px'}}>
				<div style={{marginTop: '20px'}}>
					<Button onClick={() => onNavigate && onNavigate('details')}>
						Go to Details
					</Button>
				</div>
			</div>
		</Panel>
	)
});

export default MainPanel;
