import React, { useCallback } from "react";

interface ModalProps {
	isOpen?: boolean;
	onClose: () => void;
	onSubmit: () => void;
	title?: string;
	body?: React.ReactElement;
	footer?: React.ReactElement;
	actionLabel: string;
	disabled?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
	disabled,
	isOpen,
	onClose,
	onSubmit,
}) => {
	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}

		onClose();
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) {
			return;
		}

		onSubmit();
	}, [disabled, onSubmit]);

	if (!isOpen) {
		return;
	}

	return (
		<>
			<div></div>
		</>
	);
};
