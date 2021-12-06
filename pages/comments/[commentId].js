import { comments } from "../../data/comments";

function CommentDetails({ comment }) {
    return (
        <div>
            <h1>Comment Details</h1>
            <p>Comment ID: {comment.id} | {comment.text}</p>
        </div>
    )
}

export default CommentDetails;

export async function getStaticPaths() {
    return {
        paths: [
            { params: { commentId: '1' } },
            { params: { commentId: '2' } },
            { params: { commentId: '3' } }
        ],
        fallback: false,
    }
}

export async function getStaticProps(context) {
    const { params } = context
    const { commentId } = params
    const comment = comments.find(comment => comment.id === commentId)
    console.log(comment)
    return {
        props: {
            comment,
        }
    }
}