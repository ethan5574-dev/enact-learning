import { Cell, Layout } from '@enact/ui/Layout';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';

import Sidebar from '../components/Sidebar';
import MoviePanel from '../views/movie/MoviePanel';
import TestPanel from '../views/test/TestPanel';

import css from './App.module.less';



interface AppBaseProps {
	className?: string;
	videoId?: number;
}

const AppBase = ({ className = '', ...rest }: AppBaseProps) => {
	const [panelIndex, setPanelIndex] = useState<number>(0);

	const handleNavigate = useCallback((index: number) => {
		setPanelIndex(index);
	}, []);

	return (
		<div {...rest} className={className + ' ' + css.app}>
			<Layout orientation="horizontal" className={css.layout}>
				{(
					<Cell shrink>
						<Sidebar activePanelIndex={panelIndex} onSelectPanel={handleNavigate} />
					</Cell>
				) as any}
				{(
					<Cell className={css.content}>
						{panelIndex === 0 ? <MoviePanel /> : <TestPanel />}
					</Cell>
				) as any}
			</Layout>
		</div>
	);
};

AppBase.propTypes = {
	/**
	 * Assign an alternate initial video to load first.
	 *
	 * @type {Number}
	 * @default 0
	 * @public
	 */
	videoId: PropTypes.number
};

AppBase.defaultProps = {
	videoId: 0
};

const App = ThemeDecorator(AppBase);

export default App;
export { App, AppBase };
