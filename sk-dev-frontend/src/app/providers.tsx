'use client';
import type * as React from 'react';
import { UserProvider } from '@/contexts/UserContext';
import { ThemeProvider } from './theme-providers';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<UserProvider>{children}</UserProvider>
		</ThemeProvider>
	);
}
