import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { UserType, mockUsers } from "../api/mock-data";

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<UserType | null>(null);
  const [likes, setLikes] = useState<number>(0);

  useEffect(() => {
    // Fetching user details based on ID
    const fetchedUser = mockUsers.find((user) => user.id.toString() === id);
    if (fetchedUser) {
      setUser(fetchedUser);
      setLikes(fetchedUser.likes);
    }
  }, [id]);

  if (!user) return <div>Loading...</div>;

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/like/${id}`, {
        method: "POST",
      });
      if (response.ok) {
        const data = await response.json();
        setLikes(data.likes); // This sets the like count to what the server returns
      } else {
        throw new Error("Failed to like");
      }
    } catch (error) {
      console.error("Failed to update likes", error);
    }
  };

  const handleReset = async () => {
    // Find the initial likes for the user from mock data
    const originalUser = mockUsers.find((user) => user.id.toString() === id);
    if (originalUser) {
      try {
        const response = await fetch(`/api/like/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: originalUser.likes }),
        });
        if (response.ok) {
          // Successfully reset likes on the server
          const data = await response.json();
          setLikes(data.likes); // Update local state to reflect the reset likes
        } else {
          // Handle errors, e.g., show an error message
          console.error("Failed to reset likes");
        }
      } catch (error) {
        // Handle errors, e.g., show an error message
        console.error("Failed to reset likes", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-violet-600 mb-4">{user.name}</h1>
      <p className="mb-2">
        <strong>ID:</strong> {user.id}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-2">
        <strong>Description:</strong> {user.description}
      </p>
      <p className="mb-2">
        <strong>Phone:</strong> {user.phone}
      </p>
      <p className="mb-2">
        <strong>Likes:</strong> {likes}
      </p>
      <div className="flex-auto flex space-x-4">
        <button
          className="h-10 px-6 font-semibold rounded-full bg-violet-600 text-white"
          type="submit"
          onClick={handleLike}
        >
          Like
        </button>
        <button
          className="h-10 px-6 font-semibold rounded-full border border-slate-200 text-slate-900"
          type="button"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
