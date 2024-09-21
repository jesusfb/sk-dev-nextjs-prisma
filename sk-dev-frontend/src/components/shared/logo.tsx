'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface Props {
	className?: string;
}

export const Logo: React.FC<Props> = ({ className }) => {
	const { resolvedTheme } = useTheme();
	const [color, setColor] = useState('black');

	useEffect(() => {
		if (resolvedTheme) {
			setColor(resolvedTheme === 'dark' ? 'white' : 'black');
		}
	}, [resolvedTheme]);

	return (
		<Link href="/">
			<h3 className="text-3xl font-moto">
				SK<span className="text-violet-500 text-xl">.DEV</span>
			</h3>
		</Link>
	);
};
