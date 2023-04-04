import { useEffect, useState } from 'react'
import Clicker from './Clicker.jsx'

export default function App()
{
    const [ hasClicker, setHasClicker ] = useState(true)
    const btn = document.querySelector('.btn')

    const toggleClickerClick = () =>
    {
        setHasClicker(!hasClicker)
    }
 
    return (
        <>
            <button className="btn" onClick={ toggleClickerClick }>{ hasClicker ? 'Hide' : 'Show' } Clicker</button>
            {/* { hasClicker ? <Clicker /> : null } */}
            { hasClicker && <Clicker /> }
        </>
    )
}