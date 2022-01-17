import * as React from 'react';

const useAlert = () => {
	const [alertType, setAlertType] = React.useState<'success' | 'danger'>(
		'success'
	);
	const [showAlert, setShowAlert] = React.useState<boolean>(false);
	const [alertMessage, setAlertMessage] = React.useState<string>('');

	React.useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				if (showAlert) setShowAlert(false);
			}, 1500);
			return () => clearTimeout(timer);
		}
		return () => {};
	}, [showAlert]);

	const setAlert = (type: 'success' | 'danger', message: string) => {
		setShowAlert(true);
		setAlertMessage(message);
		setAlertType(type);
	};

	return {
		alertType,
		alertMessage,
		showAlert,
		setAlert,
	};
};

export default useAlert;
