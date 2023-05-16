import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('your-json-endpoint-url');
      const shuffledBlogs = shuffleArray(response.data);
      setBlogs(shuffledBlogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  return (
    <div>
      <h1>Blogger App</h1>
      <div className="blog-container">
        {blogs.map((blog, index) => (
          <div className="blog" key={index}>
            <h2>{blog.title}</h2>
            <p>{blog.content}</p>
          </div>
        ))}
      </div>
      <button onClick={fetchBlogs}>Refresh</button>
    </div>
  );
};

export default App;
