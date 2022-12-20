import { useEffect, useState } from 'react';

//for saving the lastId
var lastId = null;
function App() {
    const [term, setTerm] = useState('');
    const [arr, setArr] = useState([]);
    const [isEditing, setIsEditing] = useState(false);


    //for fetching the data before rendering
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/?_limit=20')
            .then((response) => response.json())
            .then((data) => setArr(data));
    }, [])

    //handlingwhen the form is submitted
    const handleSubmit = (event) => {
        event.preventDefault();
        if (term === '') {
            alert('You must fill the parameter');
            return;
        }
        const newId = arr.length + 1;
        const newTask = { userid: newId, id: newId, title: term };
        setArr([newTask, ...arr]);
        setTerm('');

    }
    // changing the state when user type inside input 
    const handleInputChange = (event) => {
        setTerm(event.target.value);
    }

    //deleting the list when user clicks on delete img
    const handleDelete = (recievedId) => {
        const deletedList = arr.filter(({ id }) => {
            return id !== recievedId;
        });
        setArr(deletedList);

    }

    //handling edit option when user editing a particular todo
    const handleEdit = (id, title) => {
        if (!isEditing) {
            lastId = id;
        }
        if (isEditing) {
            const editedArr = arr.map((a) => {
                if (a.id === lastId) {
                    return { ...a, title: term }
                }
                return a;
            })
            setArr(editedArr);
            lastId = null;
            setTerm('');
        }
        setIsEditing(!isEditing);

    }
    //rendering new component when user clicks on edit 
    if (isEditing) {
        return <form action="">
            <label htmlFor="">Edit your title</label>
            <input type="text" id='editinginput' onChange={handleInputChange} />
            <button onClick={handleEdit}>Edit</button>
        </form>
    }

    //showing rendered list from arr taken from API and showing on the screen
    const renderedList = arr.map(({ id, title }) => {
        return (
            <li key={id}>
                <img src="https://cdn-icons-png.flaticon.com/512/5996/5996831.png" alt="edit" id='editimg' onClick={() => handleEdit(id, title)} />
                {title}
                {isEditing && <input type="text" />}
                <img src="https://cdn-icons-png.flaticon.com/512/9038/9038380.png" alt="delete" onClick={() => handleDelete(id)} />
            </li>
        )

    })


    return (
        <div id='main-container'>
            <h1><u>To-Do List</u></h1>
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