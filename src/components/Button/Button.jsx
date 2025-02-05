import styles from './Button.module.css';

export function Button({ children, onClick, disabled }) {
	return (
		<button disabled={disabled} onClick={onClick} className={styles.btn}>
			{children}
		</button>
	);
}
