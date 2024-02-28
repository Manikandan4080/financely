import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import React, { useState } from "react";
import "./style.css";

import { useForm } from "antd/es/form/Form";

const AddIncomeModal = ({isIncomeModalVisible,cancelIncomeModal,onFinish,}) => {

  const [form] = useForm();

  return (
    <div>
      <Modal
        className="modal-style"
        visible={isIncomeModalVisible}
        onCancel={cancelIncomeModal}
        footer={null}
        title={"Add Income"}
      >
        <Form
        style={{fontFamily:"var(--font-family)", fontWeight:600}}
          form={form}
          layout={"vertical"}
          onFinish={(values) => {
            onFinish(values, "income");
            form.resetFields();
          }}
        >


          <Form.Item
          style={{ fontWeight: 600 }}
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input the name of the transaction!",
            },
          ]}
        >
          <Input type="text" className="modal-input" />
        </Form.Item>


        <Form.Item
          style={{ fontWeight: 600 }}
          label="Amount"
          name="amount"
          rules={[
            { required: true, message: "Please input the income amount!" },
          ]}
        >
          <Input type="number" className="modal-input" />
        </Form.Item>

        <Form.Item
          style={{ fontWeight: 600 }}
          label="Date"
          name="date"
          rules={[
            { required: true, message: "Please select the income date!" },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" className="modal-input" />
        </Form.Item>
        <Form.Item
          style={{ fontWeight: 600 }}
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please select a tag!" }]}
        >
          <Select className="select-input-2">
            <Select.Option value="salary">Salary</Select.Option>
            <Select.Option value="freelance">Freelance</Select.Option>
            <Select.Option value="investment">Investment</Select.Option>
            {/* Add more tags here */}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button className="btn btn-blue" type="primary" htmlType="submit">
            Add Income
          </Button>
        </Form.Item>


        </Form>
      </Modal>
    </div>
  );
};

export default AddIncomeModal;
