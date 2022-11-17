import clsx from "clsx";

type StatusProps = {
	progress: number;
};

const StatusSVG = ({ progress }: StatusProps) => {
	// creating a binding for radius to more easily read and change the math below (FYI radius should be center - strokeWidth)

	const radius = 47;
	const dashArray = 2 * Math.PI * radius;

	const val = `295; ${dashArray * ((100 - progress) / 100)}`;

	return (
		<svg
			className="h-full fill-transparent "
			viewBox="0 0 100 100"
			xmlns="http://www.w3.org/2000/svg"
			version="1.1"
		>
			<circle className="fill-primary" cx="50" cy="50" r={radius / 1.5} />
			<text
				className="h-1/2 w-1/2 fill-customTextColorMedium  font-bodyText text-sm font-semibold"
				dominantBaseline="middle"
				textAnchor="middle"
				x="50"
				y="51"
			>
				{Math.round(progress)}%
			</text>
			<circle
				stroke="#FFC8A6"
				fill="none"
				cx="50"
				cy="50"
				r={radius}
				strokeWidth="3"
				strokeDasharray={dashArray}
				strokeDashoffset={dashArray * ((100 - progress) / 100)}
				strokeLinecap="round"
				transform="rotate(-90, 50, 50)"
			>
				<animate
					attributeName="stroke-dashoffset"
					values={val}
					dur="3s"
					repeatCount="1"
				></animate>
			</circle>
			<circle
				fill="none"
				stroke="RGBA(251, 187, 148, 0.25)"
				strokeWidth="2"
				cx="50"
				cy="50"
				r={radius}
			/>
		</svg>
	);
};

export default StatusSVG;
