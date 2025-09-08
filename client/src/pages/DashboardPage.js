// client/src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// --- Local Component Imports ---
import AccountList from '../components/Dashboard/Accounts/AccountList';
import AddAccountForm from '../components/Dashboard/Accounts/AddAccountForm';
import TransactionList from '../components/Dashboard/Transactions/TransactionList';
import AddTransactionForm from '../components/Dashboard/Transactions/AddTransactionForm';
import FinancialSummary from '../components/Dashboard/FinancialSummary/FinancialSummary';
import CategoryView from '../components/Dashboard/Categories/CategoryView';
import GoalList from '../components/Dashboard/Goals/GoalList';
import AddGoalForm from '../components/Dashboard/Goals/AddGoalForm';
import SubscriptionList from '../components/Dashboard/Bills/SubscriptionList';
import AddSubscriptionForm from '../components/Dashboard/Bills/AddSubscriptionForm';
import LoanList from '../components/Dashboard/Loans/LoanList';
import AddLoanForm from '../components/Dashboard/Loans/AddLoanForm';
import PortfolioView from '../components/Dashboard/Portfolio/PortfolioView';
import AddInvestmentForm from '../components/Dashboard/Portfolio/AddInvestmentForm';
import Modal from '../components/Layout/Modal';
import TopNav from '../components/Layout/TopNav';
import BottomNav from '../components/Layout/BottomNav';
import { SkeletonCard, SkeletonTitle } from '../components/Layout/Skeleton';

// --- API and Library Imports ---
import * as api from '../services/api';
import { FaPlus } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- Styled Components ---
const DashboardWrapper = styled.div` padding: 2rem 4rem; font-family: 'Poppins', sans-serif; color: white; @media (max-width: 768px) { padding: 1.5rem; }`;
const Header = styled.div` display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; `;
const Title = styled.h1` font-size: 2.5rem; background: linear-gradient(90deg, #7F00FF, #E100FF); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; margin: 0; `;
const ActionsContainer = styled.div` display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 1rem; `;
const ActionButton = styled.button` background: linear-gradient(135deg, #7F00FF, #5E35B1); border: none; border-radius: 8px; color: white; font-family: inherit; font-size: 1rem; padding: 0.6rem 1.2rem; cursor: pointer; transition: all 0.3s ease; display: flex; align-items: center; gap: 0.5rem; white-space: nowrap; &:hover { transform: scale(1.05); box-shadow: 0 0 15px rgba(127, 0, 255, 0.5); }`;
const LogoutButton = styled.button` background: #2a2a2a; border: 1px solid #444; border-radius: 8px; color: #ccc; font-family: inherit; font-size: 1rem; padding: 0.6rem 1.2rem; cursor: pointer; transition: all 0.3s ease; white-space: nowrap; &:hover { background-color: #333; color: white; border-color: #555; }`;
const MainContent = styled.main` background-color: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 15px; padding: 2rem;`;

// --- Main Page Component ---
const DashboardPage = () => {
  const navigate = useNavigate();
  // State for all data types
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [loans, setLoans] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for controlling which modal is open
  const [modalType, setModalType] = useState(null);

  // Data fetching logic
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [accRes, txRes, goalRes, subRes, loanRes, invRes] = await Promise.all([
          api.getAccounts(), api.getTransactions(), api.getGoals(),
          api.getSubscriptions(), api.getLoans(), api.getHoldings()
        ]);
        setAccounts(accRes.data.data);
        setTransactions(txRes.data.data);
        setGoals(goalRes.data.data);
        setSubscriptions(subRes.data.data);
        setLoans(loanRes.data.data);
        setHoldings(invRes.data.data);
      } catch (err) {
        setError("Failed to fetch data.");
        toast.error("Failed to fetch data. Your session might have expired. Please log in again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Handlers for every action
  const logoutHandler = () => { toast.info("Logged out."); localStorage.clear(); navigate('/'); };
  
  const handleAccountAdded = (item) => { setAccounts(p => [item, ...p]); toast.success("Account added!"); };
  
  const handleTransactionAdded = (item) => {
    setTransactions(p => [item, ...p].sort((a,b)=>new Date(b.date)-new Date(a.date)));
    const amount = item.type === 'Income' ? item.amount : -item.amount;
    setAccounts(p => p.map(a => a._id === item.account ? { ...a, balance: a.balance + amount } : a));
    toast.success("Transaction added!");
  };
  const handleTransactionDeleted = async (id) => {
      const originalState = [...transactions];
      const item = transactions.find(t => t._id === id);
      if(!item) return;
      setTransactions(p => p.filter(t => t._id !== id));
      try {
        await api.deleteTransaction(id);
        const amount = item.type === 'Income' ? -item.amount : item.amount;
        setAccounts(p => p.map(a => a._id === item.account ? { ...a, balance: a.balance + amount } : a));
        toast.info("Transaction deleted.");
      } catch(err) { setTransactions(originalState); toast.error("Delete failed."); }
  };
  
  const handleGoalAdded = (item) => { setGoals(p => [item, ...p]); toast.success("Goal added!"); };
  const handleGoalDeleted = async(id) => { const o=[...goals];setGoals(p=>p.filter(d=>d._id!==id));try{await api.deleteGoal(id);toast.info('Goal removed.');}catch(e){setGoals(o);toast.error('Delete failed.')}};

  const handleSubscriptionAdded = (item) => { setSubscriptions(p => [...p, item].sort((a,b)=>new Date(a.nextDueDate)-new Date(b.nextDueDate))); toast.success("Subscription added!"); };
  const handleSubscriptionDeleted = async(id)=>{const o=[...subscriptions];setSubscriptions(p=>p.filter(d=>d._id!==id));try{await api.deleteSubscription(id);toast.info('Subscription removed.');}catch(e){setSubscriptions(o);toast.error('Delete failed.')}};
  
  const handleLoanAdded = (item) => { setLoans(p => [item, ...p]); toast.success("Record added!"); };
  const handleLoanDeleted = async(id)=>{const o=[...loans];setLoans(p=>p.filter(d=>d._id!==id));try{await api.deleteLoan(id);toast.info('Record removed.');}catch(e){setLoans(o);toast.error('Delete failed.');}};

  const handleHoldingAdded = (item) => { setHoldings(p => [item, ...p]); toast.success(`${item.name} added.`); };
  const handleHoldingDeleted = async(id)=>{const o=[...holdings];setHoldings(p=>p.filter(h=>h._id!==id));try{await api.deleteHolding(id);toast.info('Holding removed.');}catch(e){setHoldings(o);toast.error('Delete failed.')}};

  const renderContent = () => {
    if (loading) { return ( <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem'}}> <SkeletonCard /> <SkeletonCard style={{height: '200px'}} /> </div> ); }
    if (error) { return <p style={{ color: '#dc3545', textAlign: 'center' }}>{error}</p>; }
    return (
        <>
            <div id="investments"><PortfolioView holdings={holdings} loading={loading} onDelete={handleHoldingDeleted} /></div>
            <div id="loans"><LoanList loans={loans} loading={loading} onDelete={handleLoanDeleted} /></div>
            <div id="goals"><GoalList goals={goals} loading={loading} onDelete={handleGoalDeleted} /></div>
            <div id="subscriptions"><SubscriptionList subscriptions={subscriptions} loading={loading} onDelete={handleSubscriptionDeleted} /></div>
            <div id="accounts"><AccountList accounts={accounts} loading={loading} /></div>
            <div id="transactions"><TransactionList transactions={transactions} accounts={accounts} onDelete={handleTransactionDeleted} loading={loading} /></div>
            <div id="reports"><CategoryView transactions={transactions} loading={loading} /></div>
            <BottomNav />
        </>
    );
  };
  
  return (
    <>
      <ToastContainer theme="dark" position="top-right" autoClose={3000}/>
      <Modal isOpen={!!modalType} onClose={() => setModalType(null)}>
        {modalType === 'account' && <AddAccountForm onClose={() => setModalType(null)} onAccountAdded={handleAccountAdded} />}
        {modalType === 'transaction' && <AddTransactionForm accounts={accounts} onClose={() => setModalType(null)} onTransactionAdded={handleTransactionAdded} />}
        {modalType === 'goal' && <AddGoalForm onClose={() => setModalType(null)} onGoalAdded={handleGoalAdded} />}
        {modalType === 'subscription' && <AddSubscriptionForm onClose={() => setModalType(null)} onSubscriptionAdded={handleSubscriptionAdded} />}
        {modalType === 'loan' && <AddLoanForm onClose={() => setModalType(null)} onLoanAdded={handleLoanAdded} />}
        {modalType === 'investment' && <AddInvestmentForm onClose={() => setModalType(null)} onHoldingAdded={handleHoldingAdded}/>}
      </Modal>
      <DashboardWrapper>
        <Header>
            <Title>Finance OS</Title>
            <ActionsContainer>
                <ActionButton onClick={() => setModalType('investment')}><FaPlus />Add Investment</ActionButton>
                <ActionButton onClick={() => setModalType('loan')}><FaPlus />Add Debt/Loan</ActionButton>
                <ActionButton onClick={() => setModalType('subscription')}><FaPlus />Add Subscription</ActionButton>
                <ActionButton onClick={() => setModalType('goal')}><FaPlus />Add Goal</ActionButton>
                <ActionButton onClick={() => setModalType('transaction')}><FaPlus />Add Transaction</ActionButton>
                <ActionButton onClick={() => setModalType('account')}><FaPlus />Add Account</ActionButton>
                <LogoutButton onClick={logoutHandler}>Logout</LogoutButton>
            </ActionsContainer>
        </Header>
        <TopNav />
        <FinancialSummary accounts={accounts} transactions={transactions} />
        <MainContent>
            {renderContent()}
        </MainContent>
      </DashboardWrapper>
    </>
  );
};
export default DashboardPage;