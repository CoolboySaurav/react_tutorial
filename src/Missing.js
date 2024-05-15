import {Link} from 'react-router-dom';

const Missing = () => {
    return (
        <main className="Missing">
            <h2>404 - Page Not Found</h2>
            <p>Sorry, there is nothing here.</p>
            <p><Link to="/">Go back to the homepage</Link></p>
        </main>
    );
};

export default Missing;