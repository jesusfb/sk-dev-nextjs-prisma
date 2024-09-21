import { Nunito, Protest_Guerrilla } from 'next/font/google';

const nunito = Nunito({
	subsets: ['cyrillic'],
	variable: '--font-nunito',
	weight: ['400', '500', '600', '700', '800', '900'],
});

const protest = Protest_Guerrilla({
	subsets: ['latin'],
	variable: '--font-protest',
	weight: '400',
});

export const fonts = {
	nunito,
	protest,
};
