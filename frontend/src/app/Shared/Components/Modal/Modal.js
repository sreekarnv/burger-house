import React from "react";
import Backdrop from "../BackDrop/BackDrop";

const Modal = (props) => {
	const {
		confirmMessage,
		show,
		setShow,
		successHandler,
		dangerHandler,
	} = props;

	return (
		<>
			<Backdrop show={show} closeHandler={() => setShow(false)} />
			<div className={`modal ${show && "modal--show"}`}>
				<>
					<h3 className='modal__msg'>{confirmMessage}</h3>
					<div className='modal__cta'>
						<button
							onClick={successHandler}
							disabled={!show}
							className='btn btn__success'>
							Yes
						</button>
						<button
							onClick={dangerHandler}
							disabled={!show}
							className='btn btn__danger'>
							No
						</button>
					</div>
				</>
			</div>
		</>
	);
};

export default Modal;
