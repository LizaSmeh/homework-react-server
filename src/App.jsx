import { useEffect, useState } from 'react'
import styles from './App.module.css'

const TO_DO_LIST = [
	{id: '1', content: 'Почистить зубы.'}
]
function App() {
	const [cases, setCases] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(()=> {
		setIsLoading(true);

		fetch('https://jsonplaceholder.typicode.com/todos')
		.then((loadedData) => loadedData.json())
		.then((loadedCases) => {
			setCases(loadedCases);
		})
		.finally(() => setIsLoading(false))
	}, [])

   return (
    <>
		<div className={styles.app}><h1 className={styles.title}>Список дел:</h1>
			{
				isLoading ? <div className={styles.loader}></div> : <ul className={styles.list}>
				{cases.map(({id, title})=> <li className={styles.case} key={id}>{title}</li>)}
				</ul>
			}
		</div>

    </>
  )
}

export default App
