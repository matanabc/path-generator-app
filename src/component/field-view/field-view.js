import React from 'react';
import { connect } from 'react-redux';
import { drawOnCanvas } from './ canvas-painter';

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
		alert();
	}

	render() {
		return (
			<div className="FieldView">
				<canvas
					className="FieldImage"
					ref={this.canvas}
					style={{
						backgroundPosition: 'center',
						backgroundSize: 'cover',
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
		filedImageUrl: state.imageUrl,
		fieldConfig: state.fieldConfig,
		rangePosition: state.rangePosition,
		path: state.paths[state.selectedPath],
		robotDrawConfig: state.robotDrawConfig,
		listenToMouseClicks: state.listenToMouseClicks,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldView);
