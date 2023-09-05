import {FC} from "react";

interface ModalProps {
	open:boolean
	handleSubmit: () => void
	handleReset: () => void
}

const Modal: FC<ModalProps> = ({open, handleSubmit, handleReset}) => {
	return (
		<dialog className={'modal'} open={open}>
			<form onReset={handleReset} onSubmit={handleSubmit}>
				<h1>Delete Todo</h1>
				<div>
					<p>Are you sure?</p>
					<button type={'submit'} autoFocus >Yes</button>
					<button type={'reset'} >No</button>
				</div>
			</form>
		</dialog>
	)
}

export default Modal