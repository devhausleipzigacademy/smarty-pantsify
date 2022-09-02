/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				primary: "#FFC8A6",
				primaryLight: "RGBA(251, 187, 148, 0.75)",
				secondary: "#73C2FB",
				secondaryLight: "RGBA(127, 185, 197, 0.75);",

				customPinkDark: "#FFADC5",
				customPinkLight: "RGBA(255, 173, 201, 0.75);",

				customGreenDark: "#A1CB9B",
				customGreenLight: "RGBA(147, 194, 135, 0.75);",

				customYellowDark: "#FCF8C0",
				customYellowLight: "RGBA(251, 226, 147, 0.75);",

				customPurpleDark: "#BBB5FF",
				customPurpleLight: "RGBA(187, 181, 255, 0.75);",

				customTextColorDark: "RGBA(65,65,65,1)",
				customTextColorMedium: "RGBA(65,65,65,0.75)",
				customTextColorLight: "RGBA(65,65,65,0.35)",

				whiteTransparent: "RGBA(255,252,252, 0.8)",
			},
			spacing: {
				34: "136px",
			},
			fontFamily: {
				logo: "Comfortaa",
				heading: "Poppins",
				subheading: "Poppins",
				tag: "Poppins",
				bodyText: "Be Vietnam Pro",
			},
		},
	},
	plugins: [],
};
