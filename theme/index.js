import { theme } from '@chakra-ui/core';
import customIcons from './icons';

const customTheme = {
	...theme,
	icons: {
		...theme.icons,
		...customIcons,
	},
	fonts: {
		body: 'Inter, sans-serif',
		heading: 'Inter, sans-serif',
		mono: 'Fira Code, monospace',
	},
	fontSizes: {
		xs: '8px',
		sm: '12px',
		md: '16px',
		lg: '18px',
		xl: '20px',
		'2xl': '24px',
		'3xl': '32px',
		'4xl': '40px',
		'5xl': '48px',
		'6xl': '64px',
	},
	fontWeights: {
		100: 100,
		200: 200,
		300: 300,
		400: 400,
		500: 500,
		600: 600,
		700: 700,
		800: 800,
		900: 900,
	},
	lineHeights: {
		tiny: '0.8',
		normal: 'normal',
		base: '1',
		shorter: '1.2',
		short: '1.4',
		tall: '1.6',
		taller: '2',
	},
	letterSpacings: {
		tighter: '-0.05em',
		tight: '-0.025em',
		normal: '0',
		wide: '0.025em',
		wider: '0.05em',
		widest: '0.1em',
	},
	breakpoints: ['30em', '48em', '62em', '80em'],
};

export default customTheme;
