import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'
import styles from './Navbar.module.css'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}><Link to="/">TelkomMoneyTrack</Link></li>

        {!user && (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </>
        )}

        {user && (
          <>
            <p>Hello, {user.displayName}</p>
            <li>
              <button className="btn" onClick={logout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}
