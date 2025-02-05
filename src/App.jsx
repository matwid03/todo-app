import { useState } from 'react';
import styles from './App.module.css';
import { Form } from './components/Form/Form';
import { TodoItem } from './components/TodoItem/TodoItem';
import { getSubheading } from './utils/getSubheading';

function App() {
	const [isFormShown, setIsFormShown] = useState(false);
	const [todos, setTodos] = useState([
		{ name: 'Zrobić klate', isDone: false, id: 1 },
		{ name: 'Zrobić plecy', isDone: true, id: 2 },
	]);

	return (
		<div className={styles.container}>
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
		</div>
	);
}

export default App;
