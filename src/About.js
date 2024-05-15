const About = () => {
    return (
        <main className="About">
            <h2>About</h2>
            <p style={{marginTop:"1rem"}}>This is a simple blog app built with React. It allows you to create, read, update, and delete blog posts. It also has a search feature to help you find posts by title or body content. It uses React Router to navigate between pages.  
            </p>
            <p style={{marginTop:"1rem"}}>Click on the "New Post" link in the navigation bar to create a new post. Click on a post title to view the full post. Click on the "Delete" button to delete a post. Click on the "Home" link to go back to the homepage.
            </p>
            <p style={{marginTop:"1rem"}}>This app was created by Saurav Mestry. It is part of a tutorial on building a blog app with React. You can find the tutorial on the my <a href="https://github.com/CoolboySaurav">Github</a>.
            </p>
        </main>
    );
};

export default About;