import { SimulationView } from './simulation';
import { Loader } from './loader';
import { Tools } from './tools';

import './app.css';

export default function App() {
	return (
		<div className='App'>
			<SimulationView filedImageUrl={''} />
			<Tools />
			<Loader />
		</div>
	);
}
