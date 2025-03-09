import { useEffect, useState } from "react";
import "./Wishlist.css";

const API_BASE_URL = "https://backend-student-motivation-app-4.onrender.com";

export default function Wishlist() {
    const [wishlist, setWishlist] = useState([]);
    const [postId, setPostId] = useState("");

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            });
            if (response.ok) {
                const data = await response.json();
                setWishlist(data);
            } else {
                console.error("Error fetching wishlist:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const addToWishlist = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({ post_id: postId }),
            });
            if (response.ok) {
                fetchWishlist();
                setPostId("");
            } else {
                console.error("Error adding to wishlist:", response.statusText);
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
        }
    };

    const removeFromWishlist = async (wishlistId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${API_BASE_URL}/wishlist/${wishlistId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
                credentials: "include",
            });
            if (response.ok) {
                fetchWishlist();
            } else {
                console.error("Error removing from wishlist:", response.statusText);
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    return (
        <div className="wishlist-container">
            <h2>Wishlist</h2>
            <div className="wishlist-input">
                <input
                    type="text"
                    placeholder="Enter Post ID"
                    value={postId}
                    onChange={(e) => setPostId(e.target.value)}
                />
                <button className="wishlist-button" onClick={addToWishlist}>Add to Wishlist</button>
            </div>
            <ul className="wishlist-list">
                {wishlist.map((item) => (
                    <li key={item.wishlist_id} className="wishlist-item">
                        <h3>{item.title}</h3>
                        <p>{item.content}</p>
                        <p>Category ID: {item.category_id}</p>
                        <p>Posted by Admin ID: {item.admin_id}</p>
                        <p>Student ID: {item.student_id}</p>
                        <p>Created at: {new Date(item.created_at).toLocaleString()}</p>
                        <p>Approved: {item.is_approved ? "Yes" : "No"}</p>
                        <p>Flagged: {item.is_flagged ? "Yes" : "No"}</p>
                        <p>Likes: {item.likes}</p>
                        <p>Dislikes: {item.dislikes}</p>
                        <button className="wishlist-button-remove" onClick={() => removeFromWishlist(item.wishlist_id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}