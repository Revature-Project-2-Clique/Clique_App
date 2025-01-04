import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";

axios.defaults.withCredentials = true;

const ConnectionManagement = ({displayUser, getFollowers, getFollowing}) => {

    const { user } = useUser();
    const [connection, setConnection] = useState(null);
    const [loading, setLoading] = useState(true);

    const getConnectionStatus = async () => {
        try {
            const response = await axios.get(`http://3.82.150.19:8080/connection/${user.userId}/isFollowing/${displayUser.userId}`);
            setConnection(response.data);
        } catch (error) {
            console.error("Error getting connection status: ", error)
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        getConnectionStatus();
    },[connection]);

    const submitHandler = async () => {
        // if users are not connected, follow button is shown and clicking it will follow the user
        if(connection === false){
            try {
                await axios.post("http://3.82.150.19:8080/connection/follow", displayUser.userId);
                setConnection(true);
                getFollowers();
                getFollowing();
            } catch (error) {
                console.error("Error following user: ", error);
            }
        } else {
            try {
                await axios.delete("http://3.82.150.19:8080/connection/unfollow", displayUser.userId);
                setConnection(false)
                getFollowers();
                getFollowing();
            } catch (error) {
                console.error("Error unfollowing user: ", error);
            }
        }
    };


    if (loading) {
        return <p>Loading...</p>;
      }

    return (
        <>
          <button onClick={()=>{submitHandler()}}>
            {connection ? "Unfollow" : "Follow"}
          </button>
        </>
      );
    
    

}

export default ConnectionManagement;