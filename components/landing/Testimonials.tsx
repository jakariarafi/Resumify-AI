"use client";

import { useState } from "react";
import { Star, Edit2, Trash2, Send, Sparkles, MessageCircle, Heart } from "lucide-react";

interface CommentReply {
  id: string;
  userName: string;
  userImage: string;
  comment: string;
  date: string;
}

interface Testimonial {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  role: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  isLiked: boolean;
  replies: CommentReply[];
}

export default function Testimonials() {
  const [currentUser] = useState({
    id: "user_123",
    userName: "Al Jakaria",
    userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    role: "CSE Graduate & Job Seeker",
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    {
      id: "1",
      userId: "user_456",
      userName: "Sarah Jenkins",
      userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
      role: "Software Engineer at Google",
      rating: 5,
      comment: "The ATS-friendly resume builder and AI bullet point generator completely transformed my job hunt. Landed interviews within a week!",
      date: "2 days ago",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: "r1",
          userName: "Michael Chen",
          userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
          comment: "Totally agree! The templates are super clean.",
          date: "1 day ago",
        },
      ],
    },
    {
      id: "2",
      userId: "user_789",
      userName: "Michael Chen",
      userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      role: "Frontend Developer",
      rating: 5,
      comment: "Getting the student EDU account verified for free access made this an absolute no-brainer. Best resume tool available right now.",
      date: "1 week ago",
      likes: 8,
      isLiked: true,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [editRatingValue, setEditRatingValue] = useState(5);

  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry: Testimonial = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.userName,
      userImage: currentUser.userImage,
      role: currentUser.role,
      rating: newRating,
      comment: newComment,
      date: "Just now",
      likes: 0,
      isLiked: false,
      replies: [],
    };

    setTestimonials([newEntry, ...testimonials]);
    setNewComment("");
    setNewRating(5);
  };

  const handleDelete = (id: string) => {
    setTestimonials(testimonials.filter((item) => item.id !== id));
  };

  const handleStartEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setEditCommentText(item.comment);
    setEditRatingValue(item.rating);
  };

  const handleSaveEdit = (id: string) => {
    setTestimonials(
      testimonials.map((item) =>
        item.id === id ? { ...item, comment: editCommentText, rating: editRatingValue } : item
      )
    );
    setEditingId(null);
  };

  const handleLike = (id: string) => {
    setTestimonials(
      testimonials.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            isLiked: !item.isLiked,
            likes: item.isLiked ? item.likes - 1 : item.likes + 1,
          };
        }
        return item;
      })
    );
  };

  const handleAddReply = (id: string, e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    const newReplyObj: CommentReply = {
      id: Date.now().toString(),
      userName: currentUser.userName,
      userImage: currentUser.userImage,
      comment: replyText,
      date: "Just now",
    };

    setTestimonials(
      testimonials.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            replies: [...item.replies, newReplyObj],
          };
        }
        return item;
      })
    );

    setReplyText("");
  };

  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16 space-y-3">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Loved by job seekers & professionals
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            See what our community has to say or share your own success story.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-white p-5 sm:p-8 rounded-3xl border border-gray-200 shadow-sm mb-12">
          <div className="flex items-center gap-3 mb-4">
            <img
              src={currentUser.userImage}
              alt={currentUser.userName}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border border-indigo-100 shrink-0"
            />
            <div>
              <h4 className="font-bold text-gray-900 text-sm sm:text-base">{currentUser.userName}</h4>
              <p className="text-[11px] sm:text-xs text-gray-500">{currentUser.role}</p>
            </div>
          </div>

          <form onSubmit={handleAddTestimonial} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Your Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setNewRating(star)}
                    className="focus:outline-none p-1"
                  >
                    <Star
                      size={22}
                      className={star <= newRating ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <textarea
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your experience with our platform..."
                className="w-full p-3 sm:p-4 text-xs sm:text-sm rounded-2xl border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 outline-none resize-none"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-indigo-700 transition shadow-sm"
              >
                <Send size={16} />
                <span>Post Review</span>
              </button>
            </div>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((item) => {
            const isMyComment = item.userId === currentUser.id;
            const isEditing = editingId === item.id;
            const isReplyingOpen = replyingToId === item.id;

            return (
              <div
                key={item.id}
                className="p-5 sm:p-8 rounded-3xl bg-white border border-gray-200 flex flex-col justify-between shadow-sm relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <img
                        src={item.userImage}
                        alt={item.userName}
                        className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover border border-gray-100 shrink-0"
                      />
                      <div className="truncate">
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">{item.userName}</h4>
                        <p className="text-[10px] sm:text-[11px] text-gray-500 truncate">{item.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] sm:text-[11px] text-gray-400 shrink-0">{item.date}</span>
                  </div>

                  {!isEditing ? (
                    <>
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < item.rating ? "fill-amber-400 text-amber-400" : "text-gray-200"}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 text-xs sm:text-sm leading-relaxed mb-4">{item.comment}</p>
                    </>
                  ) : (
                    <div className="space-y-3 mb-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setEditRatingValue(star)}
                          >
                            <Star
                              size={16}
                              className={star <= editRatingValue ? "fill-amber-400 text-amber-400" : "text-gray-300"}
                            />
                          </button>
                        ))}
                      </div>
                      <textarea
                        rows={3}
                        value={editCommentText}
                        onChange={(e) => setEditCommentText(e.target.value)}
                        className="w-full p-3 text-xs sm:text-sm rounded-xl border border-indigo-300 focus:outline-none"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSaveEdit(item.id)}
                          className="px-4 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-1.5 bg-gray-200 text-gray-700 text-xs font-bold rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 border-t border-gray-100 pt-3 mb-3">
                    <button
                      onClick={() => handleLike(item.id)}
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold transition ${
                        item.isLiked ? "text-red-500" : "text-gray-500 hover:text-gray-800"
                      }`}
                    >
                      <Heart size={16} className={item.isLiked ? "fill-red-500" : ""} />
                      <span>{item.likes}</span>
                    </button>

                    <button
                      onClick={() => setReplyingToId(isReplyingOpen ? null : item.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-indigo-600 transition"
                    >
                      <MessageCircle size={16} />
                      <span>Reply ({item.replies.length})</span>
                    </button>
                  </div>

                  {/* ইউজার যখন Reply বাটনে ক্লিক করবে, কেবল তখনই রিপ্লাই সেকশন ও ইনপুট দেখাবে */}
                  {isReplyingOpen && (
                    <div className="space-y-3 mt-3 pt-3 border-t border-gray-100">
                      {item.replies.length > 0 && (
                        <div className="bg-gray-50 rounded-2xl p-3 space-y-2.5">
                          {item.replies.map((reply) => (
                            <div key={reply.id} className="flex items-start gap-2 text-xs">
                              <img src={reply.userImage} alt={reply.userName} className="w-6 h-6 rounded-full object-cover shrink-0" />
                              <div className="flex-1 bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
                                <div className="flex justify-between items-center mb-1">
                                  <span className="font-bold text-gray-900">{reply.userName}</span>
                                  <span className="text-[9px] text-gray-400">{reply.date}</span>
                                </div>
                                <p className="text-gray-600">{reply.comment}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <form onSubmit={(e) => handleAddReply(item.id, e)} className="flex gap-2">
                        <input
                          type="text"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder="Write a reply..."
                          className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 focus:border-indigo-600 outline-none"
                          required
                        />
                        <button
                          type="submit"
                          className="px-3.5 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl hover:bg-indigo-700 transition"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  )}
                </div>

                {isMyComment && !isEditing && (
                  <div className="flex items-center justify-end gap-2 border-t border-gray-100 pt-3 mt-3">
                    <button
                      onClick={() => handleStartEdit(item)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition"
                    >
                      <Edit2 size={12} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-semibold hover:bg-red-100 transition"
                    >
                      <Trash2 size={12} />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}