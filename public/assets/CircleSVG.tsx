export function CircleSVG({ text }: any) {
	return (
		<svg className="fill-primary h-full  " viewBox="0 0 120 120">
			<circle
				cx="60"
				cy="60"
				r="50"
				stroke="black"
				strokeWidth="4"
				fill="none"
			/>
			<path d="M20,60a35,35 0 1,1 60,0"></path>
			<svg>
				<circle cx="60" cy="60" r="25" />
				<text
					className=" text-sm fill-customTextColorDark   "
					x="50%"
					y="50%"
					dominantBaseline="middle"
					textAnchor="middle"
				>
					40%
				</text>
			</svg>
		</svg>
	);
}
