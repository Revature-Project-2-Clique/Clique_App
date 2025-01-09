import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../UserContext";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import ProfileManagement from "./ProfileManagement";
import ConnectionDisplay from "./ConnectionDisplay";
import ConnectionManagement from "./ConnectionManagement";
import PostList from "../post-components/PostList";
import api from "../../service/api";

axios.defaults.withCredentials = true;

const UserProfileComponent = () => {
  const { user, token } = useUser();
  const { id } = useParams();

  // flag to determine if the requested user profile is the logged in user
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  // state to store user information
  const [responseUser, setResponseUser] = useState(null);

  // states used for child component rendering
  const [posts, setPosts] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [visible, setVisible] = useState(false);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  const getUserInformation = async () => {
    try {
        const response = await api.get(`/user/${id}`, { headers });
        setResponseUser(response.data);
        if (response.data.userId === user.userId) {
            setIsCurrentUser(true);
        } else {
            setIsCurrentUser(false);
        }
    } catch (error) {
        console.error('Error getting user: ', error);
    }
}

  const getPosts = async () => {
    try {
      const response = await api.get(`/posts/poster/${id}`, { headers });
      setPosts(response.data);
    } catch (error) {
      console.error("Error getting posts: ", error);
    }
  };

  const getFollowers = async () => {
    try {
      const response = await api.get(`/connection/${id}/followers`, { headers });
      setFollowers(response.data);
    } catch (error) {
      console.error("Error getting followers: ", error);
    }
  };

  const getFollowing = async () => {
    try {
      const response = await api.get(`/connection/${id}/following`, { headers });
      setFollowing(response.data);
    } catch (error) {
      console.error("Error getting following: ", error);
    }
  };

  useEffect(() => {
    getUserInformation();
    getPosts();
    getFollowers();
    getFollowing();
  }, [id, user]);

  if (!responseUser) {
    return <div>Loading...</div>;  // Show a loading message while data is being fetched
  }

  return (
    <div className="max-w-screen-xl mx-auto p-6 bg-white shadow-md rounded-md space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#003a92]">{responseUser.username}</h2>
        <h3 className="text-lg text-gray-700">
          {responseUser.firstName} {responseUser.lastName}
        </h3>
      </div>
      <ConnectionDisplay followers={followers} following={following} />
      {isCurrentUser ? (
        <>
          <button
            onClick={() => setVisible(true)}
            className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide
                       rounded-md text-white bg-[#002e74] hover:bg-[#004dbd]
                       focus:outline-none"
          >
            Profile Management
          </button>
          <Modal isOpen={visible}>
                <div className="font-exo">
                    <button onClick={() => setVisible(false)}>Close</button>
                    <ProfileManagement />
                </div>   
            </Modal>
        </>
      ) : (
        <>
          <ConnectionManagement
            displayUser={responseUser}
            getFollowers={getFollowers}
            getFollowing={getFollowing}
          />
        </>
      )}
      <PostList posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default UserProfileComponent;
