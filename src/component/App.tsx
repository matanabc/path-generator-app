import { SimulationView } from './simulation';
import PlayingBar from './playing-bar';

import './app.css';

export default function App() {
	return (
		<div className='App'>
			<SimulationView filedImageUrl={''} />
			<PlayingBar />
		</div>
	);
}
