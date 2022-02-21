import { ReactElement } from 'react';

type TPopup = {
	title?: string;
	show: boolean;
};

export type TPromptPopupProps = TPopup & {
	onConfirm: (value: string) => void;
	defaultValue?: string;
	placeholder?: string;
	onCancel: () => void;
};

export type TConfirmPopupProps = TPopup & {
	onConfirm: () => void;
	onCancel: () => void;
	message: string | ReactElement;
};
