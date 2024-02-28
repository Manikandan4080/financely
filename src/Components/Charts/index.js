import React from "react";
import { Line, Pie } from "@ant-design/charts";

const Charts = ({ transactions }) => {
  const sortedTransactions = transactions.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const data = sortedTransactions.map((transaction) => {
    return { date: transaction.date, amount: transaction.amount };
  });

  const spendingData = sortedTransactions.filter((transaction) => {
    if (transaction.type == "expense") {
      return { tag: transaction.tag, amount: transaction.amount };
    }
  });

  let finalSpending = spendingData.reduce((acc, obj) => {
    let key = obj.tag;
    if (!acc[key]) {
      acc[key] = { tag: obj.tag, amount: obj.amount };
    } else {
      acc[key] += obj.amount;
    }
    return acc;
  }, {});

  const config = {
    data: data,
    xField: "date",
    yField: "amount",
    height: 300,
  };

  const spendingConfig = {
    data: finalSpending,
    angleFeild: "tag",
    colorFeild: "amount",
  };

  console.log(finalSpending);

  let chart;
  let piechart;

  return (
    <div className="charts">
      <div className="line-chart">
        <h3 style={{ margin: "1rem" }}>Your analytics</h3>
        <Line
          {...config}
          onReady={(chartInstance) => (chart = chartInstance)}
          className="linechart"
        />
      </div>
      <div className="pie-chart">
        <div>
          <h3>Your Spendings</h3>
          {/* <Pie
            {...spendingConfig}
            onReady={(chartInstance) => (piechart = chartInstance)}
          /> */}

          <Pie
            {...spendingConfig}
            onReady={(chartInstance) => (piechart = chartInstance)}
            className="pie-chart"
          />
        </div>
      </div>
    </div>
  );
};

export default Charts;
