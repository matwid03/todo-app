import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';
import { Button } from '../Button/Button';

export function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleLogin = async (e) => {
		e.preventDefault();
		setError(null);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			setError(error.message);
		}
	};

	return (
		<form onSubmit={handleLogin}>
			<input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' required />
			<input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
			<Button disabled={!email || !password}>Zaloguj</Button>
			{error && <p style={{ color: 'red' }}>{error}</p>}
		</form>
	);
}
