import { useState } from 'react'
 
function CommentsPage() {

    const [comments, setComments] = useState([])
    const [comment, setComment] = useState('')
    const fetchComments = async () => {
        const response = await fetch('/api/comments')
        const data = await response.json()
        setComments(data)
    }

    const submitComment= async()=>{
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment
            })
        })
        const data = await response.json()
        setComments([...comments, data])
        setComment('')
    }

    const deleteComment = async (id) => {
        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE'
        })
        const data = await response.json()
        setComments(comments.filter(comment => comment.id !== id))
    }

    return (
        <>
        <input type="text" value={comment} onChange={e => setComment(e.target.value)} />
        <button onClick={submitComment}>Submit Comment</button>
            <button onClick={fetchComments}>Load Comments</button>
            {
                comments.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.id} {comment.text}</p>
                            <button onClick={()=>deleteComment(comment.id)}>Delete</button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default CommentsPage