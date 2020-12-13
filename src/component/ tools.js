import React from 'react';
import { connect } from 'react-redux';
import { Button, Container, Row, Dropdown } from 'react-bootstrap';
import { GiClick } from 'react-icons/gi';
import { MdBuild, MdDelete, MdEdit, MdPlayArrow } from 'react-icons/md';
import { FiDownload, FiCircle } from 'react-icons/fi';

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
						<Dropdown.Toggle size="lg">There is no path</Dropdown.Toggle>
						<Dropdown.Menu>
							<Dropdown.Divider />
							<Dropdown.Item as="button" className="AddPath">
								New path
							</Dropdown.Item>
						</Dropdown.Menu>
					</Dropdown>
					<Button className="mr-3 ml-4" size="lg">
						<MdPlayArrow />
					</Button>
					<Button className="mr-3" size="lg" title="Delete path" variant="danger">
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Tools);
