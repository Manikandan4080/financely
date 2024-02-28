import React from "react";
import { Line,Pie } from "@ant-design/charts";

const Charts = ({ transactions }) => {

  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const data = sortedTransactions.map((transaction) => {
    return { date: transaction.date, amount: transaction.amount };
  });

  const config = {
    data: data,
    xField: "date",
    yField: "amount",
  };

  // const spendingConf


  return (
    <div className="charts">
      <div className="line-chart">
        <h3 style={{ margin: "1rem" }}>Your analytics</h3>
        <Line {...config} className="linechart" />
      </div>
      <div className="pie-chart">
        <div>
          <h3>Your Spendings</h3>
          <Pie />
        </div>
      </div>
    </div>
  );
};

export default Charts;
