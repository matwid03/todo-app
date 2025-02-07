import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './TodoItem.module.css';

export function TodoItem({ id, name, isDone, onDeleteBtnClick, onDoneBtnClick, onEditBtnClick }) {
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(name);

	const handleEdit = () => {
		setIsEditing(true);
	};

	const handleSave = () => {
		if (!newName || newName.trim() === '') {
			return;
		}
		setIsEditing(false);
		onEditBtnClick(id, newName);
	};

	return (
		<li className={styles.li}>
			<span className={`${styles.checkbox} ${isDone ? styles.checked : ''}`} onClick={onDoneBtnClick}></span>
			{isEditing ? <input className={styles.input} type='text' value={newName} onChange={(e) => setNewName(e.target.value)} onBlur={handleSave} autoFocus /> : <span className={`${styles.name} ${isDone ? styles.done : ''}`}>{name}</span>}
			<Button onClick={handleEdit}>Edytuj</Button>
			<Button onClick={onDeleteBtnClick}>Usuń</Button>
		</li>
	);
}
