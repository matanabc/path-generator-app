import { FieldConfig, RobotDrawConfig } from '../component/field-view/view-config';

const initialState = {
	fieldConfig: new FieldConfig(16.5354, 8.001, 50, 25, 198, 103),
	robotDrawConfig: new RobotDrawConfig(),
	imageUrl:
		'https://www.chiefdelphi.com/uploads/default/optimized/3X/4/4/44492d390e1f186bef450b307b132e820fd88263_2_690x388.png',
};

export default function field(state = initialState, action) {
	return state;
}
