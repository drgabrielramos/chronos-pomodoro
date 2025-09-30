import { HistoryIcon, HouseIcon, SettingsIcon, SunIcon, TimerIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';

type AvailableThemes = 'dark' | 'light';

export function Menu () {

    const [theme, setTheme] =useState <AvailableThemes>('dark');


    function handleThemeChange ( event: React.MouseEvent<HTMLAnchorElement, MouseEvent> ){
        event.preventDefault();

        setTheme(prevTheme => {
            const nextTheme = prevTheme ==='dark' ? 'light' : 'dark';
            return nextTheme;
        });

        
    }

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        return() => {
            console.log('esse componente será atualizado')
        }
    }, [theme]);

    return (
    <nav className={styles.menu}>
        <a className={styles.menuLink} href='#' aria-label='Ir para a Home'title='Ir para a Home'>
            <HouseIcon/>
        </a>
        <a className={styles.menuLink} href='#'aria-label='Ver histórico'title='Ver histórico'>
            <HistoryIcon/>
        </a>
        <a className={styles.menuLink} href='#'aria-label='Configurações'title='Configurações'>
            <SettingsIcon/>
        </a>
        <a 
            className={styles.menuLink}
            href='#'
            aria-label='Mudar Tema'
            title='Mudar Tema'
            onClick={handleThemeChange}
        >
            <SunIcon/>
        </a>
    </nav>
    )
}