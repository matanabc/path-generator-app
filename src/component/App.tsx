import { View } from './simulation';
import { Loader } from './loader';
import { Tools } from './tools';
import './app.css';

export default function App() {
	return (
		<div className='App'>
			<View />
			<Tools />
			<Loader />
		</div>
	);
}
