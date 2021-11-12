import { SimulationView } from './simulation';
import PlayingBar from './playing-bar';
import { Loader } from './loader';
import { Tools } from './tools';

import './app.css';

export default function App() {
	return (
		<div className='App'>
			<SimulationView filedImageUrl={''} />
			<PlayingBar />
			<Tools />
			<Loader />
		</div>
	);
}