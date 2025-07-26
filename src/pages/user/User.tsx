import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { getData } from "../../lib/api";
import { useLocation } from "react-router-dom";
export interface UserState {
  user_id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  created_at: string;
  balance: string;
  currency: string;
  last_action?: string;
  last_action_time?: string;
}

const User = () => {
  const [state, setState] = useState<UserState[]>([]);
  const location = useLocation();

  useEffect(() => {
    reloadService();
  }, [location.search]);

  async function reloadService() {
    const results = await getData<UserState[]>("/user/users");

    const resultLast = await Promise.all(results.map(async (item) => {
      const results = await fetch('https://api-nba.cquiz.app/v1/app/admin-profile/' + item.user_id)

      const results3 = await fetch('https://api-nba2.cquiz.app/v1/app/admin-profile/' + item.user_id)

      const resultDetail = await results.json()
      const result3Detail = await results3.json()
      const total1 = (resultDetail?.user?.total);
      const total2 = (result3Detail?.user?.total);
      const total3 = total1 + total2
      return {
        ...item,
        balance1: total1,
        balance2: total2,
        balance3: total3,

      }
    }))

    setState(resultLast);
  }

  async function handleClickP() {
    try {
      const response = await fetch(
        "https://api-nba.cquiz.app/v1/app/retry-nba",
        {
          method: "GET",
        }
      );

      const response2 = await fetch(
        "https://api-nba2.cquiz.app/v1/app/retry-nba",
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results = await response.json();
      console.log(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  async function handleClickNext() {
    try {
      const response = await fetch("https://api-nba.cquiz.app/v1/app/nba", {
        method: "GET",
      });

      const response2 = await fetch("https://api-nba2.cquiz.app/v1/app/nba", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const results = await response.json();
      console.log(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <div className="flex items-center space-x-2">
        <Search />
        <button
          onClick={handleClickP}
          className="px-3 py-1 bg-gray-200 rounded-md"
        >
          เรียกผลปัจจุบัน
        </button>
        <button
          onClick={handleClickNext}
          className="px-3 py-1 bg-gray-200 rounded-md"
        >
          เรียกการแข่งวันถัดไป
        </button>
      </div>

      <Table
        column={[
          {
            name: "#",
            key: "user_id",
            order: null,
            width: 60,
          },
          {
            name: "ชื่อ - นามสกุล",
            key: "fullname",
            order: null,
            width: 192,
          },
          {
            name: "อีเมลล์",
            key: "email",
            order: null,
            width: 192,
          },
          {
            name: "ยอดเงินสะสม wnba",
            key: "balance1",
            order: null,
            width: 192,
          },
          {
            name: "ยอดเงินสะสม nba",
            key: "balance2",
            order: null,
            width: 192,
          },
          {
            name: "ยอดเงินสะสม",
            key: "balance3",
            order: null,
            width: 192,
          },
          {
            name: "เล่นเมื่อ",
            key: "created_at",
            order: null,
            width: 192,
          },
        ]}
        data={state}
      />
      <Pagination />
    </div>
  );
};

export default User;
