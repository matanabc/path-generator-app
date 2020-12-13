import React from 'react';
import { connect } from 'react-redux';
import { drawOnCanvas } from './ canvas-painter';

class FieldView extends React.Component {
	constructor(props) {
		super(props);
		this.canvas = React.createRef();
	}

	componentDidMount() {
		drawOnCanvas(this.canvas.current, this.props);
	}

	componentDidUpdate() {
		drawOnCanvas(this.canvas.current, this.props);
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
		filedImageUrl: state.view.imageUrl,
		fieldConfig: state.view.fieldConfig,
		rangePosition: state.view.rangePosition,
		robotDrawConfig: state.view.robotDrawConfig,
		path: state.path.paths[state.path.selectedPath],
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(FieldView);
