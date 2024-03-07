import React from "react";
import { Line,Pie } from "@ant-design/charts";
import "./style.css";

const Charts = ({ transactions }) => {

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const data = sortedTransactions.map((transaction) => {
    return { date: transaction.date, amount: transaction.amount, type:transaction.type };
  });




  
  const spendingData = transactions.filter((transaction) => {
    if(transaction.type.includes("expense")){
      return{tag:transaction.tag, amount:transaction.amount}
    }
  });




  const incomeData = transactions.filter((transaction) => {
    if(!transaction.type.includes("expense")){
      return{tag:transaction.tag, amount:transaction.amount}
    }
  });







  let finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if(!acc[key]){
      acc[key] = {tag:obj.tag, amount:obj.amount};
    }
    else{
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {})




  let finalIncome = incomeData.reduce((acc, obj) => {
    let key = obj.tag;
    if(!acc[key]){
      acc[key] = {tag:obj.tag, amount:obj.amount};
    }
    else{
      acc[key].amount += obj.amount;
    }
    return acc;
  }, {})
  


  const spendingDataArray = Object.keys(finalSpending).map((key) => ({
    tag: key,
    amount: finalSpending[key].amount,
  }));


  const incomeDataArray = Object.keys(finalIncome).map((key) => ({
    tag: key,
    amount: finalIncome[key].amount,
  }));





  // console.log("Final spendings >>>>>>>>>",finalSpending);



  // console.log("spending array final >>>>>>>" , spendingDataArray)





  
  const config = {
    data: data,
    xField: "date",
    yField: "amount",
    height:300,
    seriesField: "type",
    colorField: 'type'
  };

  const spendingConfig = {
    data: spendingDataArray,
    angleField: "amount",
    colorField: "tag",
    width:300,
    height:145
  }

  const incomeConfig = {
    data: incomeDataArray,
    angleField: "amount",
    colorField: "tag",
    height:145,
    width:300
  }


  let chart;
  let spendingPiechart;
  let incomePiechart;


  return (
    <div className="charts">
      <div className="line-chart">
        <h3 style={{ margin: "1rem" }}>Your analytics</h3>
        <Line {...config} onReady={(chartInstance) => (chart = chartInstance)} className="linechart" />
      </div>
      <div className="pie-chart">
        <div>
          <h3 style={{margin:"0px"}}>Your Spendings</h3>
          <Pie {...spendingConfig}/>
        </div>

        <div>
          <h3 style={{margin:"0px"}}>Your Income</h3>
          <Pie {...incomeConfig}/>
        </div>
      </div>
    </div>
  );
};

export default Charts;
