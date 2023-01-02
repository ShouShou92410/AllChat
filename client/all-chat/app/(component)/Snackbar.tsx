interface IProps {
	message: string | null;
}
const Snackbar = ({ message }: IProps) => {
	return (
		<div className="z-50 h-14 rounded-md drop-shadow flex grow items-center p-3 bg-slate-300 dark:bg-slate-600 ">
			<p>{message}</p>
		</div>
	);
};

export default Snackbar;
