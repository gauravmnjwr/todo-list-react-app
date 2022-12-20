import { useEffect, useState } from 'react';

function App() {

    const [term, setTerm] = useState('');
    const [arr, setArr] = useState([]);



    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/?_limit=20')
            .then((response) => response.json())
            .then((data) => setArr(data));
    }, [])

    const handleSubmit = (event) => {
        event.preventDefault();
        const newId = arr.length + 1;
        const newTask = { userid: newId, id: newId, title: term }
        setArr([newTask, ...arr]);
        setTerm('');

    }
    const handleInputChange = (event) => {
        setTerm(event.target.value);
    }

    const handleDelete = (recievedId) => {
        const deletedList = arr.filter(({ id }) => {
            return id !== recievedId;
        });
        setArr(deletedList);

    }
    const handleCheck = recievedId => {

    };

    const renderedList = arr.map(({ id, title, completed }) => {
        return (<li key={id}>
            {title}
            <img src="https://cdn-icons-png.flaticon.com/512/7074/7074827.png" alt="delete" onClick={() => handleDelete(id)} />
        </li>)
    })


    return (
        <div id='main-container'>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="forminput">Add Task</label>
                <input type="text" id="forminput" onChange={handleInputChange} value={term} />
                <button>Submit</button>
            </form>
            {renderedList}
        </div>
    )
}

export default App;