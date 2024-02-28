import { TbCreditCardOff } from "react-icons/tb";

const NoTransactions = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding:"1rem",
        margin:"1rem",
        gap:"0.5rem"
      }}
    >
      <TbCreditCardOff className="no-transactions" />
      <h3>You have no transactions</h3>
    </div>
  );
};

export default NoTransactions;
