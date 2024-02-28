import React from 'react';
import "./style.css";

import Button from "../Common/Button";

import { Row, Card } from 'antd';

const Cards = ({showIncomeModal, showExpenseModal, balance, income, expense}) => {
  return (
    <div >
        <Row className='my-card-row'>
            <Card className='cardstyle' title="Current Balance">
                <p style={{marginBottom:"0.5rem"}}>Your current Balance: </p>
                <p style={{marginBottom:"0.5rem"}}>₹ {balance}</p>
                <Button text="Reset Balance" blue={true}/>
            </Card>
            <Card className='cardstyle' title="Add Income">
                <p style={{marginBottom:"0.5rem"}}>Income So far: </p>
                <p style={{marginBottom:"0.5rem"}}>₹ {income}</p>
                <Button text="Add Income" blue={true} onClick={showIncomeModal}/>
            </Card>
            <Card className='cardstyle' title="Add Expense">
                <p style={{marginBottom:"0.5rem"}}>Expense So far: </p>
                <p style={{marginBottom:"0.5rem"}}>₹ {expense}</p>
                <Button text="Add Expense" blue={true} onClick={showExpenseModal}/>
            </Card>
        </Row>
    </div>
  )
}

export default Cards;
