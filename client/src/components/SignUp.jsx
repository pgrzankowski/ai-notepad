import '../styles/SignUp.css'

export default function SignUp() {
    return (
        <div className="sign-up">
            <h1>Sign Up</h1>
            <input type="text" placeholder='Username' />
            <input type="email" placeholder='E-mail'/>
            <input type="password" placeholder='Password'/>
            <button>Sign Up</button>
        </div>
    )
}