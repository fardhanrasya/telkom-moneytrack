import { useEffect, useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function TransactionForm({ uid }) {
  const [thing, setThing] = useState('');
  const [amount, setAmount] = useState('');
  const { addDocument, response } = useFirestore("transaction");
  const checkIfIntOrNot = parseInt(amount)

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!thing || amount <= 0 || !Number.isInteger(checkIfIntOrNot)) {
      alert("Please fill out valid transaction details.");
      return;
    }

    addDocument({
      uid, 
      thing, 
      amount: parseFloat(amount),
    });
  };

  useEffect(() => {
    if (response.success) {
      setThing('');
      setAmount('');
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input 
            type="text" 
            onChange={(e) => setThing(e.target.value)}
            value={thing}
            required
          />
        </label>
        <label>
          <span>Amount (Rp):</span>
          <input 
            type="number"
            min="1"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            required
          />
        </label>
        {!response.isPending && <button>Add transaction</button>}
        {response.isPending && <button disabled>Loading</button>}
      </form>
    </>
  );
}
