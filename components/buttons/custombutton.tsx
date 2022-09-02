import { CustomButtonProps } from "../../types/buttons";

export function CustomButton({ text, clickHandler }: CustomButtonProps) {
	return (
		<button
			onClick={clickHandler}
			className="py-3 px-2 border border-blue-500 bg-slate-300 text-black"
		>
			{text}
		</button>
	);
}
