import { useFirestore } from '../../hooks/useFirestore'
import styles from './Home.module.css'

export default function TransactionList({docs}) {
  const {deleteDocument} = useFirestore('transaction')
  return (
    <ul className={styles.transactions}>
      {docs.map((doc) => (
        <li key={doc.id}>
          <p className={styles.name}>{doc.thing}</p>
          <p className={styles.amount}>Rp{doc.amount.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</p>
          <button onClick={() => deleteDocument(doc.id)}>x</button>
        </li>
      ))}
    </ul>
  )
}
