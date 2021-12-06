import useSWR from "swr"

const fetcher = async () => {
    const res = await fetch('http://localhost:4000/dashboard')
    const data = await res.json()
    return data
}

function DashboardSWR() {
    const { data, error } = useSWR('dashboard', fetcher)
    if (error) return 'failed to load'
    if (!data) return 'loading...'
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

export default DashboardSWR