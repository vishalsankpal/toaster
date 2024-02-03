import { useEffect, useState } from "react";
import "./App.css";
import Pill from "./Components/Pill";
import User from "./Components/User";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchSuggestion, setSearchSuggestion] = useState([]);
  const [selctedUsers, setSelctedUsers] = useState([]);
  const [selectedUsersSet, setSelectedUsersSet] = useState(new Set());
  //https://dummyjson.com/users/search?q=jo
  useEffect(() => {
    if (searchTerm?.trim() === "") {
      setSearchSuggestion([]);
      return;
    }
    fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setSearchSuggestion(data))
      .catch((err) => console.error("Error:", err));
  }, [searchTerm]);
  const selectusers = (user) => {
    setSelctedUsers([...selctedUsers, user]);
    setSelectedUsersSet(new Set([...selectedUsersSet, user.email]));
    setSearchTerm("");
    setSearchSuggestion([]);
  };
  const removeUserHandler = (removedUser) => {
    setSelctedUsers(selctedUsers.filter((user) => user.id !== removedUser.id));
    const updatedEmails = new Set(selectedUsersSet);
    updatedEmails.delete(removedUser.email);
    setSelectedUsersSet(updatedEmails);
  };
  return (
    <div className="user-search-container">
      <div className="user-search-input">
        {selctedUsers.map((user) => {
          return (
            <Pill
              key={user.email}
              image={user.image}
              text={`${user.firstName} ${user.lastName}`}
              onClick={() => removeUserHandler(user)}
            />
          );
        })}
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for user... "
          />
          {/* Suggetions */}
          <ul className="suggestions-list">
            {searchSuggestion?.users?.map((user) =>
              !selectedUsersSet.has(user.email) ? (
                <User
                  key={user.email}
                  onClick={() => selectusers(user)}
                  image={user.image}
                  text={`${user.firstName} ${user.lastName}`}
                />
              ) : null
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
