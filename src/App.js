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

function App() {
  const [search, setSearch] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'React Js Tutorial Blog',
      datetime: 'July 01, 2021 10:00:00',
      body: 'This is a blog post about React Js Tutorial Blog.'
    },
    {
      id: 2,
      title: 'Introduction to React Js Tutorial Blog',
      datetime: 'July 02, 2021 10:00:00',
      body: 'I am going to introduce you to React Js Tutorial Blog. I will show you how to use React Js Tutorial Blog. I will start with the basics. We will learn about React Js Tutorial Blog together. I hope you enjoy it.'
    },
    {
      id: 3,
      title: 'What is React Js Tutorial Blog',
      datetime: 'July 03, 2021 10:00:00',
      body: 'This is a tutorial blog about React Js Tutorial Blog. I will show you what is React Js Tutorial Blog. I will start with the basics.'
    },
    {
      id: 4,
      title: 'How to use React Js Tutorial Blog',
      datetime: 'July 04, 2021 10:00:00',
      body: 'This is a blog post about React Js Tutorial Blog. I will show you how to use React Js Tutorial Blog.'
    },
    {
      id: 5,
      title: 'React Js Tutorial Blog Tips',
      datetime: 'July 05, 2021 10:00:00',
      body: 'This is a blog post about React Js Tutorial Blog. I will show you some tips on how to use React Js Tutorial Blog.'
    }
  ]);
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');

  useEffect(() => {
    const results = posts.filter(post => post.title.toLowerCase().includes(search.toLowerCase()) || post.body.toLowerCase().includes(search.toLowerCase()));
    setSearchResults(results.reverse());
  }, [posts, search]);

  const handleSubmit = (e) => {
    //e.PreventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };
    const allPosts = [...posts, newPost];
    setPosts(allPosts);
    setPostTitle('');
    setPostBody('');
    history.push('/');
  }

  const handleDelete = (id) => {
    const postsList = posts.filter(post => post.id !== id);
    setPosts(postsList);
    //history.push('/');
  }
  
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
