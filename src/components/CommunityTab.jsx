"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../app/firebase";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";

export default function CommunityTab() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPosts(data);
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <h2>Community</h2>
      <CreatePost onPost={() => {}} />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}