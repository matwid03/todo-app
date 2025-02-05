import { Button } from '../Button/Button';
import styles from './TodoItem.module.css';

export function TodoItem({ name, isDone, onDeleteBtnClick, onDoneBtnClick }) {
	return (
		<li className={styles.li}>
			<span className={`${styles.name}  ${isDone ? styles.done : ''}`}>{name}</span>
			{isDone || <Button onClick={onDoneBtnClick}>Zrobione</Button>}
			<Button onClick={onDeleteBtnClick}>Usuń</Button>
		</li>
	);
}
