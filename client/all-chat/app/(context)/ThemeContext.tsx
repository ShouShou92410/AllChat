'use client';

import { createContext, useState } from 'react';

// Context
type Theme = 'light' | 'dark';
interface IThemeContext {
	theme: Theme;
	themeToggle: () => void;
}
const ThemeContext = createContext<IThemeContext>({
	theme: 'dark',
	themeToggle: () => {},
});

// Context provider
interface IProps {
	children: React.ReactNode;
}
const ThemeProvider = ({ children }: IProps) => {
	const [theme, setTheme] = useState<Theme>('dark');
	const themeToggle = () => {
		setTheme(theme === 'light' ? 'dark' : 'light');
	};

	return (
		<ThemeContext.Provider
			value={{
				theme: theme,
				themeToggle: themeToggle,
			}}
		>
			<html lang="en" className={theme}>
				{children}
			</html>
		</ThemeContext.Provider>
	);
};

export { ThemeContext, ThemeProvider };
