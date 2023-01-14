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
	const [theme, setTheme] = useState<Theme>(
		typeof window !== 'undefined' && localStorage.getItem('AllChat-theme') === 'light'
			? 'light'
			: 'dark'
	);

	const themeToggle = () => {
		const newTheme = theme === 'light' ? 'dark' : 'light';
		setTheme(newTheme);
		localStorage.setItem('AllChat-theme', newTheme);
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
