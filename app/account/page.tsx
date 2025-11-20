"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axiosClient from "../apis/axiosClient";
import { DatePicker, Input, Table } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import useAuth from "../hooks/useAuth";
dayjs.extend(utc);
import EditAccount from "../components/edit-account";

function Account() {
  useAuth();
  const [date, setDate]: any = useState();
  const [endDate, setEndDate]: any = useState();
  const [id, setId]: any = useState();
  const [list, setList]: any[] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showEditAccount, setShowEditAccount] = useState(false);
  const [totalBalance, setTotalBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const getList = async () => {
    setIsLoading(true);
    let response = await axiosClient.get("/accounts", {
      params: {
        id: id,
        date: date,
        endDate: endDate,
      },
    });
    setList(response.data.accounts);
    setIsLoading(false);
  };
  useEffect(() => {
    getList();
  }, [date, endDate, id]);

  useEffect(() => {
    let total = list.reduce((sum: number, account: any) => sum + (account.balance || 0), 0);
    setTotalBalance(total);
  }, [list]);

  const columns = [
    // {
    //   title: "No.",
    //   dataIndex: "",
    //   key: "no",
    //   render: (value: any, record: any, index: number) => index + 1,
    // },
    {
      title: "ID",
      dataIndex: "account_id",
      key: "account_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (value: string) => (value ? <a target="_blank" href={`https://zalo.me/${value}`}>{value}</a> : ""),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (value: number) =>
        value ? `$${(value / 100)?.toLocaleString("en-US", { minimumFractionDigits: 0 })}` : "",
    },
    {
      title: "Vol",
      dataIndex: "volume",
      key: "volume",
    },
    {
      title: "Profit",
      dataIndex: "total_profit",
      key: "total_profit",
      render: (value: number) => `$${value?.toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      width: 100,
      textAlign: "center",
      render: (_: any, record: any) => (
        <div>
          <button
            className="btn btn-sm btn-primary mr-2"
            onClick={() => {
              setSelectedAccount(record);
              setShowEditAccount(true);
            }}>
            Edit
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      {isLoading ? (
        // loading spinner full page centered
        <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="box">
          <h2 className="title mt-3">Danh sách tài khoản</h2>
          <div className="clearfix">
            <div className="float-left mr-3">
              <b>Tổng số tiền:</b> ${(totalBalance / 100).toLocaleString("en-US", { minimumFractionDigits: 0 })}{" "}
            </div>
            <div className="float-left mr-3">
              <b>Tổng số lãi:</b> $
              {list
                .reduce((sum: number, account: any) => sum + (account.total_profit || 0), 0)
                .toLocaleString("en-US", { minimumFractionDigits: 0 })}{" "}
            </div>
            <div className="float-left mr-3">
              <b>Tổng volums:</b>{" "}
              {list
                .reduce((sum: number, account: any) => sum + (account.volume || 0), 0)
                .toLocaleString("en-US", { minimumFractionDigits: 0 })}{" "}
              lô
            </div>
          </div>
          <div className="row">
            <div className="col col-md-4">
              <Input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="Search by Account ID"
                style={{ width: "100%", marginRight: 10 }}
              />
            </div>
            <div className="col col-md-4">
              <DatePicker
                value={date ? dayjs(date) : null}
                onChange={(value) => setDate(value ? value.format("YYYY-MM-DD") : null)}
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                placeholder="Select start date"
              />
            </div>
            <div className="col col-md-4">
              <DatePicker
                value={endDate ? dayjs(endDate) : null}
                onChange={(value) => setEndDate(value ? value.format("YYYY-MM-DD") : null)}
                format="YYYY-MM-DD"
                style={{ width: "100%" }}
                placeholder="Select end date"
              />
            </div>
          </div>
          <Table columns={columns} dataSource={list} rowKey="id" scroll={{ x: "max-content" }} />

          {/* EditAccount component can be added here */}
          {showEditAccount && (
            <EditAccount
              show={showEditAccount}
              account={selectedAccount}
              onClose={() => setShowEditAccount(false)}
              onUpdated={() => {
                setShowEditAccount(false);
                getList();
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Account;
