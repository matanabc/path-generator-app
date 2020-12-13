import React from 'react';
import { connect } from 'react-redux';

class FieldView extends React.Component {
	render() {
		return (
			<div className="FieldView">
				<canvas
					className="FieldImage"
					ref={this.canvasRef}
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
		filedImageUrl: state.field.imageUrl,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

const fieldView = connect(mapStateToProps, mapDispatchToProps)(FieldView);
export default fieldView;
