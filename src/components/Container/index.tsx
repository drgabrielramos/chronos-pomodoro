import styles from './styles.module.css'

type ContainerPros = {
    children: React.ReactNode
}

export function Container( {children}: ContainerPros) {
    return (
        <div className={styles.container}>
            <div className={styles.content}> {children}
            </div>
        </div>
    );
}