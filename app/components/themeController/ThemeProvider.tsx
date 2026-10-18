"use client";
import React from 'react';

// Создаем контекст с дефолтными значениями
const context = React.createContext({
    isDark: false,
    toggleTheme: () => {},
});

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    // 1. Инициализируем состояние как false (или null)
    const [isDark, setIsDark] = React.useState(false);

    // 2. Используем useEffect, чтобы определить тему ПРИ МОНТИРОВАНИИ в браузере
    React.useEffect(() => {
        // Проверяем, есть ли уже сохраненная тема или системная
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
            setIsDark(true);
        }
    }, []);

    // 3. Эффект для обновления классов и localStorage
    React.useEffect(() => {
        if (isDark) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    function toggleTheme() {
        setIsDark((prev) => !prev);
    }

    return (
        <context.Provider value={{ isDark, toggleTheme }}>
            {children}
        </context.Provider>
    );
};

export { ThemeProvider, context };