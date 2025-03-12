import React, { useEffect, useState } from "react";

const Github = () => {
  let [data, setData] = useState([]);
  let [input, setInput] = useState("");
  let [username, setUsername] = useState(null);

  useEffect(() => {
    async function fn() {
      let response = await fetch(`https://api.github.com/users`);
      let fd = await response.json();
      setData(fd);
    }
    fn();
  }, []);

  let handleChange = (e) => {
    setInput(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    let name = data.find((i) => i.login === input);
    setUsername(name || null);
  };

  return (
    <>
      <div className="container">
        <form action="#" onSubmit={handleSubmit}>
          <input type="text" value={input} onChange={handleChange} />
          <button type="submit">Search</button>
        </form>

        {/* Conditional Rendering - Show only if username is found */}
        {username ? (
          <div>
            <p>{username.login}</p>
            <img src={username.avatar_url} alt="Profile" width="200px" />
            <p>
              <a
                href={username.html_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {username.html_url}
              </a>
            </p>
          </div>
        ) : (
          <p>No user found</p>
        )}
      </div>
    </>
  );
};

export default Github;
