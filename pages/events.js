import {useState} from 'react'
import {useRouter} from 'next/router'

function EventList({ eventList }) {

    const [events, setEvents] = useState(eventList)
    const router = useRouter()

    const fetchIndiaEvents = async() =>{
        const response = await fetch('http://localhost:4000/events?location=India')
        const data = await response.json()
        setEvents(data)
        router.push('/events?location=India',undefined,{ shallow: true })
    }

    return (
        <>
            <button onClick={fetchIndiaEvents}>India Events</button>
            <h1>List of events</h1>
            {
                events.map(event => {
                    return (
                        <div key={event.id}>
                            <h2>{event.id} {event.title} {event.date} | {event.location}</h2>
                            <p>{event.description}</p>
                            <hr />
                        </div>
                    )
                })
            }
        </>
    )
}

export default EventList

export async function getServerSideProps(context) {
    const {query} = context
    const {location} = query
    const queryString = location ? '?location=India' : ''
    const res = await fetch(`http://localhost:4000/events${queryString}`)
    const data = await res.json()
    return {
        props: {
            eventList: data,
        }
    }
}