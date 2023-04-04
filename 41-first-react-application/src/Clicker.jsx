import { useEffect,  useState } from 'react'

export default function Clicker()
{
    // const countState = useState(0)
    // const count = countState[0]
    // const setCount = countState[1]

    const [count, setCount] = useState(parseInt(localStorage.getItem('count') ?? 0))

    useEffect(() =>
    {
        console.log('First render')

        return () =>
        {
            console.log('Component disposed')
        }
    }, [])

    useEffect(() =>
    {
        localStorage.setItem('count', count)
    }, [count])

    const buttonClick = () =>
    {
        setCount(value => value + 1)
    }

    return <div>
        <div>Clicks count: { count }</div>
        <button onClick={ buttonClick }>Click me</button>
    </div>
}