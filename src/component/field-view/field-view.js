import { addWaypoint } from '../../redux/path/actions';
import { drawOnCanvas } from './canvas-painter';
import { connect } from 'react-redux';
import React from 'react';

class FieldView extends React.Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
		this.onClick = this.onClick.bind(this);
	}

	componentDidMount() {
		drawOnCanvas(this.canvas.current, this.props);
	}

	componentDidUpdate() {
		const canvas = this.canvas.current;
		if (this.props.listenToMouseClicks) canvas.addEventListener('mousedown', this.onClick);
		else canvas.removeEventListener('mousedown', this.onClick);
		drawOnCanvas(canvas, this.props);
	}

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
		filedImageUrl: state.imageUrl,
		fieldConfig: state.fieldConfig,
		rangePosition: state.rangePosition,
		robotDrawConfig: state.robotDrawConfig,
		listenToMouseClicks: state.listenToMouseClicks,
		isPathInReverse: state.selected ? state.paths[state.selected].isInReverse : false,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addWaypoint: (waypoint) => dispatch(addWaypoint(waypoint)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldView);
