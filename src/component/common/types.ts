import { ExtendedKeyboardEvent } from 'mousetrap';
import { ButtonProps, FormControlProps, StackProps } from 'react-bootstrap';

export type TRowProps = StackProps & {};
export type TInputProps = FormControlProps & { tooltip?: string };

export type TButtonProps = ButtonProps & {
	title?: string;
	shortcut?: string[];
	onClick: (e: ExtendedKeyboardEvent, combo: string) => any;
};
