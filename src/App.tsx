import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function EditList({
  id,
  list,
  lists,
  setLists,
  setEditState,
  editState,
}: {
  id: string;
  list: any;
  lists: any[];
  setLists: Function;
  setEditState: Function;
  editState: number;
}) {
  const [editedUser, setEditedUser] = useState(list.name);
  const [editedEmail, setEditedEmail] = useState(list.email);

  function handleInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = event.target.value;
    setEditedUser(value);
    const newList = lists.map((li) =>
      li.id === list.id ? { ...li, name: value } : li
    );
    setLists(newList);
  }
  function handleInputPrice(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const value = event.target.value;
    setEditedEmail(value);
    const newList = lists.map((li) =>
      li.id === list.id ? { ...li, email: value } : li
    );
    setLists(newList);
  }

  const handleUpdate = (id: string) => {
    const updatedUser = {
      id: id,
      name: editedUser,
      email: editedEmail,
    };
    axios
      .put(`https://jsonplaceholder.typicode.com/users/${id}`, updatedUser)
      .then((res) => {
        console.log(res.data);
        const updatedUsers = lists.map((user) =>
          user.id === editState
            ? { ...user, name: editedUser, email: editedEmail }
            : user
        );
        setLists(updatedUsers);
        setEditState(-1);
        // setIsEditing(false);
      })
      .catch((err) => console.log(err));

    console.log(id);
  };

  return (
    <div>
      <input
        type="text"
        onChange={handleInput}
        name="name"
        placeholder="name"
        value={editedUser}
      />

      <input
        type="text"
        onChange={handleInputPrice}
        name="email"
        placeholder="email"
        value={editedEmail}
      />

      <button onClick={() => handleUpdate(id)}>Update</button>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editState, setEditState] = useState<number>(-1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        setUsers(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleAddUser = () => {
    const newUser = {
      name: name,
      email: email,
    };
    axios
      .post("https://jsonplaceholder.typicode.com/users", newUser)
      .then((res) => {
        setUsers([...users, res.data]);
        setName("");
        setEmail("");
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id: string) => {
    console.log(id);
    // const userss = users.filter((item) => item.id !== id);
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((res) => {
        console.log(res.status);
        if (res.status !== 200) {
          return;
        } else {
          setUsers(users.filter((item) => item.id !== id));
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = (id: number) => {
    setEditState(id);
    console.log(id);
  };

  return (
    <div className="App">
      <div className="add_user_input">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <div className="users">
        {users.map((user) =>
          editState === user.id ? (
            <EditList
              id={user.id}
              list={user}
              lists={users}
              setLists={setUsers}
              editState={editState}
              setEditState={setEditState}
            />
          ) : (
            <div id={user.id} className="user">
              <span>{user.name}</span>
              <span>{user.email}</span>
              <span className="btns">
                <button className="edit" onClick={() => handleEdit(user.id)}>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="delete"
                >
                  Delete
                </button>
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
