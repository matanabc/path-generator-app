export type TPromptPopupProps = {
	onConfirm: (value: string) => void;
	defaultValue?: string;
	placeholder?: string;
	onCancel: () => void;
	title?: string;
	show: boolean;
};
