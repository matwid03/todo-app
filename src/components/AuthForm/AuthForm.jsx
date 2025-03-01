import styles from './AuthForm.module.css';
import { useEffect, useState } from 'react';
import { Button } from '../Button/Button';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export function AuthForm({ isLogin }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	useEffect(() => {
		setEmail('');
		setPassword('');
		setError(null);
	}, [isLogin]);

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, email, password);
			} else {
				await createUserWithEmailAndPassword(auth, email, password);
			}
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<>
			<form className={styles.form} onSubmit={handleRegister}>
				<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
				<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Hasło' required />
				<Button disabled={!email || !password}>{isLogin ? 'Zaloguj' : 'Zarejestruj'}</Button>
			</form>
			{error && (
				<div className={styles.error}>
					<p style={{ color: 'red' }}>{isLogin ? 'Błędny email lub hasło!' : 'Hasło powinno zawierać minimum 6 znaków!'}</p>
				</div>
			)}
		</>
	);
}
