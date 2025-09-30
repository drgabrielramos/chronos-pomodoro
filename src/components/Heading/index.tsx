import styles from './styles.module.css';

type HeadingProos = {
    children: React.ReactNode;
}

export function Heading ({ children} : HeadingProos) {
    return <h1 className={styles.heading}>{children}</h1>;
}