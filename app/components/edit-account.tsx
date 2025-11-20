import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import axiosAdminClient from "../apis/axiosAdminClient";
import toast from "react-hot-toast";

const EditAccount = ({ account, show, onClose, onUpdated }: any) => {
  const [isModalOpen, setIsModalOpen] = useState(show);
  const [form] = Form.useForm();
  // set default values
  form.setFieldsValue({
    username: account?.account_id || "",
    phone: account?.phone || "",
    name: account?.name || "",
    percen: account?.percen || 70,
  });
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    onClose();
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      // console.log("Form Values:", values);
      // setIsModalOpen(false);
      // form.resetFields();
      let result: any = await axiosAdminClient.post("/admin/edit-account", {
        account_id: account.account_id,
        name: values.name,
        phone: values.phone,
        percen: values.percen,
      });
      if(result.code !== 200){
        // throw new Error('Failed to update account');
        toast.error('Failed to update account');
        return;
      } else {
        toast.success('Account updated successfully');
        onUpdated(); // notify parent to refresh data
      }
      
      
    } catch (errorInfo) {
      console.log("Validate Failed:", errorInfo);
    }
  };

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal Form
      </Button> */}
      <Modal title="My Form" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="modal_form">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="percen"
            label="Percent"
            rules={[
              { required: true, message: "Please input the percent!" },
            ]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditAccount;
