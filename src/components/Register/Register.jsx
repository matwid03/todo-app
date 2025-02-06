import { useState } from 'react';
import { Button } from '../Button/Button';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

export function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			await createUserWithEmailAndPassword(auth, email, password);
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<form onSubmit={handleRegister}>
			<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
			<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' required />
			<Button disabled={!email || !password}>Zarejestruj</Button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	);
}
