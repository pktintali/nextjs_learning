import Link from 'next/link'
function Home() {
    return (
        <>
            <h1>Next JS PreRendering</h1>
            <Link href='/users'>
                <a> Users</a>
            </Link>
            <br></br>
            <Link href='/posts'>
                <a>Posts</a>
            </Link>
        </>
    )
}

export default Home