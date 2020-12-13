import { changeSelectedPath, deletePath } from '../redux/path/path-actions';
import { MdBuild, MdDelete, MdEdit, MdPlayArrow } from 'react-icons/md';
import { Button, Container, Row, Dropdown } from 'react-bootstrap';
import { FiDownload, FiCircle } from 'react-icons/fi';
import { GiClick } from 'react-icons/gi';
import { connect } from 'react-redux';
import React from 'react';

class Tools extends React.Component {
	render() {
		return (
			<Container>
				<Row>
					<Button className="mr-3" size="lg" title="Add waypoint with mouse" variant={'primary'}>
						<GiClick />
					</Button>
					<Button className="mr-3" size="lg" title="Save csv path to robot">
						<FiDownload />
					</Button>
					<Button className="mr-3" size="lg" title="Settings">
						<MdBuild />
					</Button>
					<Dropdown>
						<Dropdown.Toggle size="lg">
							{this.props.pathName ? this.props.pathName : 'Select Path'}
						</Dropdown.Toggle>
						<Dropdown.Menu>
							{this.props.pathsName.map((pathName, index) => {
								return (
									<Dropdown.Item
										as="button"
										key={index}
										onClick={() => this.props.changeSelectedPath(pathName)}
									>
										{pathName}
									</Dropdown.Item>
								);
							})}
							<Dropdown.Divider />
							<Dropdown.Item as="button">New path</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Button className="mr-3 ml-4" size="lg">
						<MdPlayArrow />
					</Button>
					<Button
						className="mr-3"
						size="lg"
						title="Delete path"
						variant="danger"
						onClick={this.props.deletePath}
					>
						<MdDelete />
					</Button>
					<Button className="mr-3" size="lg" title="Rename path">
						<MdEdit />
					</Button>
					<Button className="mr-3" size="lg">
						<FiCircle className="mr-2" />
						in reverse
					</Button>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		pathName: state.path.selectedPath,
		pathsName: Object.keys(state.path.paths),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		changeSelectedPath: (pathName) => dispatch(changeSelectedPath(pathName)),
		deletePath: () => dispatch(deletePath()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
