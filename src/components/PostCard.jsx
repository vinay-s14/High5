import { useState } from "react";
import { doc, updateDoc, increment, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../app/firebase";

export default function PostCard({ post }) {
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await updateDoc(doc(db, "posts", post.id), {
        likes: increment(1)
      });
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setTimeout(() => setIsLiking(false), 300);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    try {
      await addDoc(collection(db, "posts", post.id, "comments"), {
        name: name.trim(),
        content: comment.trim(),
        likes: 0,
        createdAt: serverTimestamp()
      });

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-2 border-blue-900 rounded-2xl shadow-xl shadow-blue-900/30 overflow-hidden mb-6 transition-all hover:border-blue-700">
      {/* Post header with corner accent */}
      <div className="relative p-6 border-b border-blue-900/50">
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-full"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {post.name?.charAt(0).toUpperCase() || "?"}
            </div>
            <div>
              <div className="text-blue-300 font-bold text-lg">{post.name}</div>
              <div className="text-gray-500 text-xs font-mono tracking-wider">TRANSMISSION RECEIVED</div>
            </div>
          </div>
          
          <p className="text-gray-300 leading-relaxed text-base">{post.content}</p>
        </div>
      </div>

      {/* Like button section */}
      <div className="px-6 py-4 bg-black/30 border-b border-blue-900/50">
        <button
          onClick={handleLike}
          disabled={isLiking}
          className={`px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-bold text-white transition-all flex items-center gap-2 shadow-lg shadow-blue-900/50 hover:shadow-xl hover:shadow-blue-800/50 border border-blue-500 ${isLiking ? 'scale-95' : 'hover:scale-105'}`}
        >
          <span className="text-xl">{isLiking ? "💫" : "👍"}</span>
          <span className="tracking-wider">LIKE</span>
          <span className="px-2 py-0.5 bg-blue-900 rounded-full text-sm font-mono">
            {post.likes}
          </span>
        </button>
      </div>

      {/* Comment form section */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-cyan-500 to-transparent"></div>
          <span className="text-cyan-400 text-sm font-mono tracking-widest">ADD TRANSMISSION</span>
          <div className="h-px flex-1 bg-gradient-to-l from-cyan-500 to-transparent"></div>
        </div>

        <div onSubmit={handleComment}>
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 text-xs font-mono tracking-wider mb-2 block">
                CALLSIGN:
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-800 bg-black text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="text-gray-400 text-xs font-mono tracking-wider mb-2 block">
                MESSAGE:
              </label>
              <textarea
                placeholder="Add your comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-xl border-2 border-blue-800 bg-black text-white placeholder-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              />
            </div>

            <button
              onClick={handleComment}
              className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 rounded-xl font-bold tracking-widest text-white transition-all shadow-lg shadow-cyan-900/50 hover:shadow-xl hover:shadow-cyan-800/50 border border-cyan-500 flex items-center justify-center gap-2"
            >
              <span className="text-xl">📡</span>
              <span>TRANSMIT COMMENT</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer decoration */}
      <div className="h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600"></div>
    </div>
  );
}