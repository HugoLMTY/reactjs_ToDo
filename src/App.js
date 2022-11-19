import './App.css';

import Header from './pages/header';
import TodoList from './pages/todoTable';
// import Navigator from './config/routes';

function App() {
	return (
		<div>
			<Header />
			<TodoList />

			{/* <Navigator /> */}

		</div>
	)
}

export default App;
