import React, { useEffect, useState } from "react";
import Header from "../Components/Common/Header";
import Cards from "../Components/Cards";
import AddExpensesModal from "../Components/Modals/AddExpensesModal";
import AddIncomeModal from "../Components/Modals/AddIncomeModal";

import { addTransAction } from "../Components/Functions/addTransaction";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import TransactionsTable from "../Components/TransactionsTable";
import Charts from "../Components/Charts";
import NoTransactions from "../Components/TransactionsTable/NoTransactions";

const Dashboard = () => {
  const [user] = useAuthState(auth);

  const [isIncomeModalVisible, setIsIncomeModalVisible] = useState(false);
  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);

  const [transactions, setTransactions] = useState([]);

  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [loading, setLoading] = useState(false);

  const showIncomeModal = () => {
    setIsIncomeModalVisible(true);
  };
  const cancelIncomeModal = () => {
    setIsIncomeModalVisible(false);
  };

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };
  const cancelExpenseModal = () => {
    setIsExpenseModalVisible(false);
  };

  const onFinish = (values, type) => {
    // console.log(values, type);
    const newTransaction = {
      type: type,
      name: values.name,
      date: values.date.format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
    };

    setTransactions([...transactions, newTransaction]);
    setIsIncomeModalVisible(false);
    setIsExpenseModalVisible(false);

    const docRef = addTransAction(newTransaction, user); //from "../Components/Functions/addTransaction";
    if (docRef) {
      toast.success("Transaction added");
      let newTransactionArr = transactions;
      newTransactionArr.push(newTransaction);
      setTransactions(newTransactionArr);
    }
    calculateBalance();
  };

  const calculateBalance = () => {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type == "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });
    setIncome(totalIncome);
    setExpense(totalExpense);
    setBalance(totalIncome - totalExpense);
  };

  useEffect(() => {
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transactions`));
      const querySnap = await getDocs(q);

      let transactionsArray = [];
      querySnap.forEach((doc) => {
        transactionsArray.push(doc.data());
      });

      setTransactions(transactionsArray);
      // console.log(transactionsArray);
      // toast.info("Transactions fetched");
    }
    setLoading(false);
  };

  return (
    <div style={{width:"100%"}}>
      <Header />
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className='dashboard-div'>
          <Cards
            showIncomeModal={showIncomeModal}
            showExpenseModal={showExpenseModal}
            balance={balance}
            income={income}
            expense={expense}
          />

          {/* <Modal visible={isIncomeModalVisible}>Income</Modal>
        <Modal visible={isExpenseModalVisible}>Expense</Modal> */}
          <AddExpensesModal
            isExpenseModalVisible={isExpenseModalVisible}
            cancelExpenseModal={cancelExpenseModal}
            onFinish={onFinish}
          />
          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            cancelIncomeModal={cancelIncomeModal}
            onFinish={onFinish}
          />


          {
            transactions.length > 0 ? <Charts transactions={transactions}/> : <NoTransactions/>
          }

          <TransactionsTable
            className="transaction-table"
            user={user}
            setTransactions={setTransactions}
            calculateBalance={calculateBalance}
            transactions={transactions}
            fetchTransactions={fetchTransactions}
            addTransAction={addTransAction}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
