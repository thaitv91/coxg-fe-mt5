"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosClient from "../apis/axiosClient";
import { DatePicker, Table } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import useAuth from "../hooks/useAuth";
dayjs.extend(utc);
import moment from "moment";

function Account() {
  useAuth();
  const [date, setDate]: any = useState();
  const [list, setList]: any[] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const getList = async () => {
    let response = await axiosClient.get("/accounts", {
      params: {
        date: date,
      },
    });
    setList(response.data.accounts);
  };
  useEffect(() => {
    getList();
  }, [date]);

  useEffect(() => {
    let total = list.reduce((sum: number, account: any) => sum + (account.balance || 0), 0);
    setTotalBalance(total);
  }, [list]);

  const columns = [
    {
      title: "No.",
      dataIndex: "",
      key: "no",
      render: (value: any, record: any, index: number) => index + 1,
    },
    {
      title: "Id",
      dataIndex: "account_id",
      key: "account_id",
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value: number) => value ? `$${(value / 100)?.toLocaleString("en-US", { minimumFractionDigits: 0 })}` : '',
    },
    {
      title: "Profit",
      dataIndex: "total_profit",
      key: "total_profit",
      render: (value: number) => `$${value?.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    },
  ];

  return (
    <div className="container">
      <div className="box">
        <h2 className="title mt-3">Danh sách tài khoản</h2>
        <div className="mt-2 mb-2 float-right">
          <DatePicker
            value={date ? dayjs(date) : null}
            onChange={(value) => setDate(value ? value.format("YYYY-MM-DD") : null)}
            format="YYYY-MM-DD"
          />
        </div>
        <div className="clearfix">
          <div className="float-left">Tổng số tiền: ${ (totalBalance / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })} </div>
        </div>
        <Table columns={columns} dataSource={list} rowKey="id"  />
        {/* <table className="table table-bordered">
          <thead>
            <tr>
              <th>No.</th>
              <th>ID</th>
              <th>Name</th>
              <th>Profit</th>
            </tr>
          </thead>
          <tbody>
            {list.map((user: any, index: number) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.account_id}</td>
                <td>{user.name}</td>
                <td>{user.total_profit}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default Account;
