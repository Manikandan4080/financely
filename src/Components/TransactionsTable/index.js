import { Input, Radio, Select, Table } from "antd";
import { Option } from "antd/es/mentions";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

import "./style.css";
import Button from "../Common/Button";
import { parse, unparse } from "papaparse";
import { toast } from "react-toastify";
import { addTransAction } from "../Functions/addTransaction";

const TransactionsTable = ({ transactions, fetchTransactions, setTransactions, user, calculateBalance}) => {
  const [searchInput, setSearchInput] = useState("");
  const [typeOfFilter, setTypeOfFilter] = useState("");

  const [sortKey, setSortKey] = useState("");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
  ];

  //filtering values
  let filteredTranscations = transactions.filter(
    (transaction) =>
      transaction.name.includes(searchInput) &&
      transaction.type.includes(typeOfFilter)
  );

  //sorting values
  let sortedValues = filteredTranscations.sort((a, b) => {
    if (sortKey === "Date") {
      return (new Date(a.date) - new Date(b.date));
    } else if (sortKey == "amount") {
      return a.amount - b.amount;
    } else {
      return 0;
    }
  });




  // export import as CSV
  const exportToCSV = () => {
    const csv = unparse(transactions, {
      fields: ["name", "type", "date", "amount", "tag"],
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transactions.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }






  function importFromCSV(event) {
    event.preventDefault();
    try {
      parse(event.target.files[0], {
        header: true,
        complete: async function (results) {
          // Now results.data is an array of objects representing your CSV rows
          for (const transaction of results.data) {
            // Write each transaction to Firebase, you can use the addTransaction function here
            console.log("Transactions", transaction);
            const newTransaction = {
              ...transaction,
              amount: parseInt(transaction.amount),
            };
            setTransactions([...transactions, newTransaction]);
            const docRef = await addTransAction(newTransaction, user);
            if(docRef){
              let newTransactionArr = transactions;
              newTransactionArr.push(newTransaction);
              setTransactions(newTransactionArr);
              calculateBalance();
            }
          }
        },
      });
      toast.success("All Transactions Added");
      fetchTransactions();
      event.target.files = null;
    } catch (e) {
      toast.error(e.message);
    }
  }



  return (
    <div style={{width:'100%', display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      {/* <Input
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search by Name"
      ></Input> */}
      <div className="input-select">
        <div className="search-flex">
          <FaSearch color="grey" />
          <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search by name"
          ></input>
        </div>
        <Select
          className="select-input"
          onChange={(value) => setTypeOfFilter(value)}
          value={typeOfFilter}
          placeholder="Filter"
          allowClear
        >
          <Option value="">All</Option>
          <Option value="income">Income</Option>
          <Option value="expense">Expense</Option>
        </Select>
      </div>
      <div className="my-transactions-tab">
        <h3>My Transactions</h3>
        <Radio.Group
          className="radio-input"
          onChange={(e) => setSortKey(e.target.value)}
          value={sortKey}
        >
          <Radio.Button value={""}>No Sort</Radio.Button>
          <Radio.Button value={"Date"}>Sort by Date</Radio.Button>
          <Radio.Button value={"amount"}>Sort by Amount</Radio.Button>
        </Radio.Group>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="export-import-button" onClick={exportToCSV}>Export CSV</button>
          <label htmlFor="file-csv" className="export-import-button import-blue-btn">
            Import CSV
          </label>
          <input
          id="file-csv"
          type="file"
          accept=".csv"
          required
          onChange={importFromCSV}
          style={{display:"none"}}
          />
        </div>
      </div>
      <Table className="table" dataSource={sortedValues} columns={columns} />
    </div>
  );
};

export default TransactionsTable;
