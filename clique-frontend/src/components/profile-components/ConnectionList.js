import { Link } from 'react-router-dom';

const ConnectionList = ({connections, title}) => {

    return(
        <>
            <h2>{title}</h2><br/>
            {connections.length > 0 ? (
                <>
                    {connections.map((connection) => (
                        <div key={connection.userId}>
                        <Link to={`/user/${connection.userId}`}>
                                    {connection.username}: {connection.firstName} {connection.lastName}
                        </Link>
                        <br/>
                        </div>
                    ))}
                </>
                ) : (
                    <p>Nothing to display</p>
                )}
        </>
    );
}

export default ConnectionList;