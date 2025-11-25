import kind from '@enact/core/kind';
import { Cell, Layout } from '@enact/ui/Layout';
import { Panels } from '@enact/sandstone/Panels';
import Routable, { Route } from '@enact/ui/Routable';
import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
import PropTypes from 'prop-types';
import { Component } from 'react';

import Sidebar from '../components/Sidebar';
import MoviePanel from '../views/movie/MoviePanel';
import TestPanel from '../views/test/TestPanel';

import css from './App.module.less';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// Create RoutablePanels by wrapping Panels with Routable HOC
const RoutablePanels = Routable({ navigate: 'onBack' }, Panels);

interface AppState {
	path: string;
}

class AppBase extends Component<any, AppState> {
	constructor(props: any) {
		super(props);
		this.state = {
			path: '/movie'
		};
	}

	handleNavigate = ({ path }: { path: string }) => {
		console.log('App: Navigating to', path);
		this.setState({ path });
	};

	handleMoviePanel = () => {
		this.handleNavigate({ path: '/movie' });
	};

	handleTestPanel = () => {
		this.handleNavigate({ path: '/test' });
	};

	render() {
		const { className = '', ...rest } = this.props;
		const { path } = this.state;

		return (
			<QueryClientProvider client={queryClient}>
				<div {...rest} className={className + ' ' + css.app}>
					<Layout orientation="horizontal" className={css.layout}>
						{(
							<Cell shrink>
								<Sidebar
									activePath={path}
									onMoviePanel={this.handleMoviePanel}
									onTestPanel={this.handleTestPanel}
								/>
							</Cell>
						) as any}
						{(
							<Cell className={css.content}>
								<RoutablePanels noCloseButton onBack={this.handleNavigate} path={path}>
									<Route path="movie" component={MoviePanel} />
									<Route path="test" component={TestPanel} />
								</RoutablePanels>
							</Cell>
						) as any}
					</Layout>
				</div>
			</QueryClientProvider>
		);
	}
}

const App = ThemeDecorator(AppBase);

export default App;
export { App, AppBase };
