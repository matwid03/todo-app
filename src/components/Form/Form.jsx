import { useState } from 'react';
import { Button } from '../Button/Button';
import styles from './Form.module.css';

export function Form({ onSubmit }) {
	const [inputValue, setInputValue] = useState('');

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit(inputValue);
			}}
			className={styles.form}>
			<input
				value={inputValue}
				onChange={(e) => {
					setInputValue(e.target.value);
				}}
				className={styles.input}
				type='text'
			/>
			<Button disabled={inputValue.trim() === ''}>Dodaj</Button>
		</form>
	);
}
