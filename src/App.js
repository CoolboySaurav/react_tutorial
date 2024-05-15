import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom'; 
import {useState, useEffect} from 'react';
import {format} from 'date-fns';
import api from './api/Post';

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('http://localhost:3500/posts');
        setPosts(response.data);
        // if (response && response.data) { 
        //   setPosts(response.data);
        // }
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);    
        } else if (error.request) {
          console.log(`Error:${error.message}`); 
        }
      }
    }; // Add a comma here
    fetchData();
  }, [])

  useEffect(() => {
    const results = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(results.reverse());
  }, [posts, search]);

  const handleSubmit =  async (e) => {
    //e.PreventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    try{
      const response = api.post('http://localhost:3500/posts', newPost);
      const allPosts = [...posts, response.data];
      setPosts(allPosts);
      setPostTitle('');
      setPostBody('');
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDelete = async (id) => {
    try{
      await api.delete(`http://localhost:3500/posts/${id}`);
      const postsList = posts.filter(post => post.id !== id);
      setPosts(postsList);
      history.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="App">
      <Header title="React Js Tutorial Blog"/>
      <Nav search={search} setSearch={setSearch}/>
      <Switch>
        <Route exact path="/">
          <Home posts={searchResults}/>
        </Route>
        <Route exact path="/post">
          <NewPost 
            postTitle={postTitle}
            setPostTitle={setPostTitle}
            postBody={postBody}
            setPostBody={setPostBody}
            handleSubmit={handleSubmit}
          />
        </Route>
        <Route path="/post/:id">
          <PostPage posts={posts} handleDelete={handleDelete} />
        </Route>
        <Route path="/about" component={ About } />
        <Route path="*" component={ Missing } />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
