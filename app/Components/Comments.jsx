"use client"
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea'; // Assuming we might want a textarea, but Input is fine for now or I create Teaxtarea
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { UserCircle2 } from 'lucide-react';

const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comment?blogId=${blogId}`);
            if (response.data.success) {
                setComments(response.data.comments);
            }
        } catch (error) {
            console.error("Failed to fetch comments");
        }
    };

    useEffect(() => {
        fetchComments();
    }, [blogId]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('/api/comment', {
                blogId,
                author,
                text
            });
            if (response.data.success) {
                toast.success(response.data.msg);
                setAuthor("");
                setText("");
                fetchComments();
            } else {
                toast.error("Error posting comment");
            }
        } catch (error) {
            toast.error("Error posting comment");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-16 max-w-[800px] mx-auto">
            <h3 className="text-2xl font-bold mb-8">Comments ({comments.length})</h3>

            <form onSubmit={onSubmitHandler} className="mb-12 space-y-4">
                <div>
                    <Input
                        type="email"
                        value={author} // Still using author state for the input value, but semantically it's now email
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Your Email"
                        required
                        className="max-w-xs"
                    />
                </div>
                <div>
                    <Input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Share your thoughts..."
                        required
                        className="w-full"
                    />
                </div>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post Comment'}
                </Button>
            </form>

            <div className="space-y-6">
                {comments.map((comment, index) => (
                    <Card key={index} className="border-none shadow-sm bg-zinc-50 dark:bg-zinc-900/50">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                            <UserCircle2 className="w-8 h-8 text-muted-foreground" />
                            <div>
                                <CardTitle className="text-sm font-semibold">{comment.author}</CardTitle>
                                <p className="text-xs text-muted-foreground">{new Date(comment.date).toLocaleDateString()}</p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">{comment.text}</p>
                        </CardContent>
                    </Card>
                ))}
                {comments.length === 0 && (
                    <p className="text-center text-muted-foreground italic">No comments yet. Be the first!</p>
                )}
            </div>
        </div>
    );
};

export default Comments;
