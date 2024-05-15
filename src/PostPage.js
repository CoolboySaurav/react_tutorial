import { useParams, Link } from "react-router-dom";


const PostPage = ({posts, handleDelete}) => {
    const {id} = useParams();
    const post = posts.find(post => post.id.toString() === id); // find the post with the id that matches the id in the URL
    return (
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <button onClick={() => handleDelete(post.id)}>Delete Post</button>
                    </>
                }
                {!post && 
                    <>
                        <h2>Post not found</h2>
                        <p>Sorry, we couldn't find the post you were looking for.</p>
                        <Link to="/">Back to Our Homepage</Link>
                    </>
                }
            </article>
        </main>
    );
};

export default PostPage;