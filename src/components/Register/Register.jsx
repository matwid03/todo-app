import { useState } from 'react';
import { registerUser } from '../../utils/authService';
import { Button } from '../Button/Button';

export function Register() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(null);

	const handleRegister = async (e) => {
		e.preventDefault();
		setError(null);

		try {
			await registerUser(email, password);
			alert('Rejestracja udana');
		} catch (error) {
			setError(error.message);
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
