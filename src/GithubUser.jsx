import React, { useEffect, useState } from "react";
import "./GithubUser.css"; // Import external CSS

const GithubUser = () => {
  const [username, setUsername] = useState(null);
  const [input, setInput] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!username) return;

    async function fetchData() {
      setLoading(true);
      setError(""); // Reset error message

      try {
        let response = await fetch(`https://api.github.com/users/${username}`);
        let fd = await response.json();

        if (fd.message === "Not Found") {
          setError("User not found! Try another username.");
          setData(null);
        } else {
          setData(fd);
        }
      } catch (error) {
        setError("Something went wrong! Please try again.");
      }

      setLoading(false);
    }

    fetchData();
  }, [username]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setUsername(input);
  };

  return (
    <div className="container">
      <h1>🔍 GitHub User Search</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Enter GitHub username..."
          value={input}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {data && (
        <div className="profile-card">
          <img src={data.avatar_url} alt="Profile" className="avatar" />
          <h2>{data.name || "No Name"}</h2>
          <p>
            <b>Username:</b> {data.login}
          </p>
          <p>
            <b>Bio:</b> {data.bio || "No bio available"}
          </p>
          <p>
            <b>Location:</b> {data.location || "Unknown"}
          </p>
          <p>
            <b>Followers:</b> {data.followers}
          </p>
          <p>
            <b>Following:</b> {data.following}
          </p>
          <p>
            <b>Public Repos:</b> {data.public_repos}
          </p>
          <a href={data.html_url} target="_blank" rel="noopener noreferrer">
            🔗 Visit Profile
          </a>
        </div>
      )}
    </div>
  );
};

export default GithubUser;
