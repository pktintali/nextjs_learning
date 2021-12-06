import { useState, useEffect } from 'react'

function Dashboard() {
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    useEffect(() => {
        async function fetchData() {
            const res = await fetch('http://localhost:4000/dashboard')
            const data = await res.json()
            setData(data)
            setIsLoading(false)
        }
        fetchData()
    },[])
    if(isLoading) {
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Posts- {data.posts}</h2>
            <h2>Likes - {data.likes}</h2>
            <h2>Followers - {data.followers}</h2>
            <h2>Followings - {data.followings}</h2>
        </div>
    )
}
export default Dashboard;