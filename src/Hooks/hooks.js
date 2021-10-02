import { useState } from "react";

export const useForm = (callback, initialState = {}) => {
	const [values, setValues] = useState(initialState);
	function onChange(event) {
		if (event.target.name === "rating")
			setValues({
				...values,
				[event.target.name]: parseInt(event.target.value),
			});
		else setValues({ ...values, [event.target.name]: event.target.value });
	}

	const onSubmit = (event) => {
		event.preventDefault();
		callback();
	};

	return {
		onChange,
		onSubmit,
		values,
	};
};
