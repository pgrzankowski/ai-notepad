import '../styles/Footer.css'
import GitHubLogo from '../assets/github-mark-white.svg'


export default function Footer() {
    return (
        <div className='footer'>
            <img src={GitHubLogo} width='20' height='20'></img>
            <a href='https://github.com/pgrzankowski' target='_blank'>pgrzankowski</a>
        </div>
    )
}