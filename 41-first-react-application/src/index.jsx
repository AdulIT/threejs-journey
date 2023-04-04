import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css'


const root = createRoot(document.querySelector('#root'))

const adult = 'AdulIT'
const color = 'coral'

root.render(
    <App></App>
)