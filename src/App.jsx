import { useEffect, useState } from 'react';
import styles from './App.module.css';
import { Form } from './components/Form/Form';
import { TodoItem } from './components/TodoItem/TodoItem';
import { getSubheading } from './utils/getSubheading';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase';
import { Register } from './components/Register/Register';
import { Button } from './components/Button/Button';
import { Login } from './components/Login/Login';

function App() {
	const [user, setUser] = useState(null);
	const [isFormShown, setIsFormShown] = useState(false);
	const [todos, setTodos] = useState([
		{ name: 'Zrobić klate', isDone: false, id: 1 },
		{ name: 'Zrobić plecy', isDone: true, id: 2 },
	]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});
		return () => unsubscribe();
	}, []);

	const handleLogout = async () => {
		await signOut(auth);
	};

	return (
		<div className={styles.container}>
			{user ? (
				<>
					<header className={styles.header}>
						<div>
							<h1>Do zrobienia</h1>
							<h2>{getSubheading(todos.length)}</h2>
						</div>

						{!isFormShown && (
							<button
								onClick={() => {
									setIsFormShown(true);
								}}
								className={styles.btn}>
								+
							</button>
						)}
					</header>

					{isFormShown && (
						<Form
							onSubmit={(newTodoName) => {
								setTodos((prevTodos) => [...prevTodos, { name: newTodoName, isDone: false, id: prevTodos.length > 0 ? prevTodos.at(-1).id + 1 : 0 }]);
								setIsFormShown(false);
							}}
						/>
					)}
					<ul>
						{todos.map(({ id, name, isDone }) => (
							<TodoItem
								key={id}
								name={name}
								isDone={isDone}
								onDeleteBtnClick={() => setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))}
								onDoneBtnClick={() => {
									setTodos((prevTodos) =>
										prevTodos.map((todo) => {
											if (todo.id !== id) {
												return todo;
											}
											return {
												...todo,
												isDone: true,
											};
										}),
									);
								}}
							/>
						))}
					</ul>
					<Button onClick={handleLogout} className={styles.btn}>
						Wyloguj
					</Button>
				</>
			) : (
				<>
					<h1>Logowanie / Rejestracja</h1>
					<Register />
					<Login />
				</>
			)}
		</div>
	);
}

export default App;
