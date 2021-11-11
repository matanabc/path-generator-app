import { TSettingsConfigProps } from './types';

export default function SettingsConfig({ children, title }: TSettingsConfigProps) {
	return (
		<div className='Config'>
			<h5>{title}</h5>
			{children}
		</div>
	);
}
