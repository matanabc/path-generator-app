import { addWaypoint, setWaypoint, setSelectedWaypoint } from '../../redux/path/actions';
import { drawOnCanvas } from './canvas-painter';
import { connect } from 'react-redux';
import React from 'react';

class FieldView extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			waypoint: undefined,
			index: undefined,
		};
		this.canvas = React.createRef();
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		const canvas = this.canvas.current;
		drawOnCanvas(canvas, this.props);
		canvas.addEventListener('mousedown', this.onDown);
		canvas.addEventListener('dblclick', this.onDoubleClick);
	}

	componentDidUpdate() {
		const canvas = this.canvas.current;
		drawOnCanvas(canvas, this.props);
	}

	onDoubleClick = (event) => {
		if (!this.props.path) return;
		const { waypoint, index } = this.getWaypoint(this.getMousePosition(event));
		if (!waypoint) return;
		this.props.setSelectedWaypoint(index);
	};

	onDown = (event) => {
		if (!this.props.path) return;
		const { waypoint, index } = this.getWaypoint(this.getMousePosition(event));
		if (!waypoint) return;
		if (event.which > 1) alert('Right');
		else {
			const canvas = this.canvas.current;
			this.setState(() => ({ waypoint: waypoint, index: index }));
			canvas.addEventListener('mousemove', this.whileMove);
			canvas.addEventListener('mouseup', this.onUp);
		}
	};

	whileMove = (event) => {
		this.props.setWaypoint({ ...this.state.waypoint, ...this.getMousePosition(event) }, this.state.index);
	};

	onUp = (event) => {
		const canvas = this.canvas.current;
		canvas.removeEventListener('mousemove', this.whileMove);
		canvas.removeEventListener('mouseup', this.onUp);
		this.setState(() => ({ waypoint: undefined, index: undefined }));
	};

	getWaypoint = ({ x, y }) => {
		const space = 0.1;
		const maxX = x + space;
		const minX = x - space;
		const maxY = y + space;
		const minY = y - space;

		const { waypoints } = this.props.path;
		let index = undefined;
		const waypoint = waypoints.filter((waypoint, i) => {
			if (maxX >= waypoint.x && minX <= waypoint.x && maxY >= waypoint.y && minY <= waypoint.y) {
				index = i;
				return true;
			}
			return false;
		})[0];
		return { waypoint: waypoint, index: index };
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

	onClick(event) {
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
		this.props.addWaypoint({ x: Number(x.toFixed(3)), y: Number(y.toFixed(3)) });
	}

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
		listenToMouseClicks: state.listenToMouseClicks,
		isPathInReverse: state.path ? state.path.isReverse() : false,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addWaypoint: (waypoint) => dispatch(addWaypoint(waypoint)),
		setSelectedWaypoint: (index) => dispatch(setSelectedWaypoint(index)),
		setWaypoint: (waypoint, index) => dispatch(setWaypoint(waypoint, index)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldView);
