import { CustomSwitchProps } from "../../types/buttons";

export function ToggleSwitch({ text, value, clickHandler }: CustomSwitchProps) {
	return (
		<label
			htmlFor="priority-switch"
			className="flex items-center cursor-pointer relative mb-4 w-11 h-6"
		>
			<input
				id="priority-switch"
				type="checkbox"
				name="priority"
				className="sr-only peer"
				checked={value}
				onChange={clickHandler}
			/>{" "}
			<div className="toggle-bg bg-slate-300 border-2 border-slate-300 w-full h-full rounded-full"></div>
			<span className="ml-3 text-sm font-medium sr-only">{text}</span>
		</label>
	);
}
