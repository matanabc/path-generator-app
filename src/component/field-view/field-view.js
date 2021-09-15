import { addWaypoint, setWaypoint, setSelectedWaypoint } from '../../redux/path/actions';
import { drawOnCanvas } from './canvas-painter';
import { connect } from 'react-redux';
import React from 'react';

class FieldView extends React.Component {
	constructor(props) {
		super(props);
		this.state = { index: undefined, newWaypoint: false };
		this.canvas = React.createRef();
		this.space = 0.5;
	}

	componentDidMount() {
		const canvas = this.canvas.current;
		drawOnCanvas(canvas, this.props);
		canvas.addEventListener('mousedown', this.onDown);
		document.onkeydown = (e) => this.setState(() => ({ newWaypoint: e.ctrlKey }));
		document.onkeyup = (e) => this.setState(() => ({ newWaypoint: e.ctrlKey }));
	}

	componentDidUpdate = () => drawOnCanvas(this.canvas.current, this.props);

	onDown = (event) => {
		if (!this.props.path) return;
		const { x, y } = this.getMousePosition(event);
		const index = this.getWaypointIndex(x, y);
		const canvas = this.canvas.current;
		this.props.setSelectedWaypoint(index);
		this.setState(() => ({ index: index }));
		if (index === undefined) return;
		if (this.state.newWaypoint) {
			this.props.addWaypoint({ x: x, y: y }, index);
			this.setState(() => ({ index: index + 1 }));
			this.props.setSelectedWaypoint(index + 1);
		}
		canvas.addEventListener('mousemove', this.whileMove);
		canvas.addEventListener('mouseup', this.onUp);
	};

	whileMove = (event) => {
		const { path, setWaypoint } = this.props;
		const { index } = this.state;
		const { waypoints } = path;
		setWaypoint({ ...waypoints[index], ...this.getMousePosition(event) }, index);
	};

	onUp = () => {
		const canvas = this.canvas.current;
		canvas.removeEventListener('mousemove', this.whileMove);
		canvas.removeEventListener('mouseup', this.onUp);
		this.setState(() => ({ index: undefined }));
	};

	getWaypointIndex = (x, y) => {
		const maxX = x + this.space,
			minX = x - this.space,
			maxY = y + this.space,
			minY = y - this.space;
		const { waypoints } = this.props.path;
		let index = undefined;
		const waypoint = waypoints.filter((waypoint, i) => {
			if (maxX >= waypoint.x && minX <= waypoint.x && maxY >= waypoint.y && minY <= waypoint.y) {
				index = i;
				return true;
			}
			return false;
		});
		if (waypoint.length > 0) return index;
		else return undefined;
	};

	getMousePosition = (event) => {
		const canvas = this.canvas.current;
		const rect = canvas.getBoundingClientRect();
		const scaleX = canvas.width / rect.width;
		const scaleY = canvas.height / rect.height;
		const x =
			((event.clientX - rect.left) * scaleX - this.props.fieldConfig.topLeftXPixel) *
			this.props.fieldConfig.widthPixelToMeter;
		const y =
			((event.clientY - rect.top) * scaleY - this.props.fieldConfig.topLeftYPixel) *
			this.props.fieldConfig.hightPixelToMeter;
		return { x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) };
	};

	render() {
		return (
			<div className="FieldView">
				<canvas
					className="FieldImage"
					ref={this.canvas}
					style={{
						backgroundPosition: 'center',
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundImage: 'url(' + this.props.filedImageUrl + ')',
					}}
				/>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		path: state.path,
		isPathMode: state.isPathMode,
		filedImageUrl: state.imageUrl,
		fieldConfig: state.fieldConfig,
		rangePosition: state.rangePosition,
		robotDrawConfig: state.robotDrawConfig,
		selectedWaypoint: state.selectedWaypoint,
		drawRobotInterval: state.drawRobotInterval,
		listenToMouseClicks: state.listenToMouseClicks,
		isPathInReverse: state.path ? state.path.isReverse() : false,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addWaypoint: (waypoint, index) => dispatch(addWaypoint(waypoint, index)),
		setSelectedWaypoint: (index) => dispatch(setSelectedWaypoint(index)),
		setWaypoint: (waypoint, index) => dispatch(setWaypoint(waypoint, index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldView);
