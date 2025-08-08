import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { getData } from "../../lib/api";
import { useLocation, useParams } from "react-router-dom";

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

const UserDetail = () => {
  const [state, setState] = useState<UserState[]>([]);
  const [state1, setState1] = useState<UserState[]>([]);
  const [tab, setTab] = useState<number>(0);
  const [totals1, setTotal1] = useState<number>(0);
  const [totals2, setTotal2] = useState<number>(0);

  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    reloadService();
  }, [location.search]);

  function buildValue(params: any) {
    const list = params.filter((item: any) => item.status === "inactive");

    const newList = list.map((item: any) => {
      return {
        id: item.id,
        name: item.name,
        index1: {
          color: item?.record_data?.rounds?.[0]?.isWin ? "green" : "red",
          text: item.random.random[0],
        },
        index2: {
          color: item?.record_data?.rounds?.[1]?.isWin ? "green" : "red",
          text: item.random.random[1],
        },
        index3: {
          color: item?.record_data?.rounds?.[2]?.isWin ? "green" : "red",
          text: item.random.random[2],
        },
        index4: {
          color: item?.record_data?.rounds?.[3]?.isWin ? "green" : "red",
          text: item.random.random[3],
        },
        index5: {
          color: item?.record_data?.rounds?.[4]?.isWin ? "green" : "red",
          text: item.random.random[4],
        },
        index6: {
          color: item?.record_data?.rounds?.[5]?.isWin ? "green" : "red",
          text: item.random.random[5],
        },
        created_at: item.created_at,
      };
    });
    console.log(newList);

    return newList;
  }

  async function reloadService() {
    const results = await fetch(
      `${process.env.REACT_APP_URL_NBA}/v1/app/admin-profile/` + id
    );
    const results2 = await fetch(
      `${process.env.REACT_APP_URL_NBA}/v1/app/admin-home-page.list/` + id
    );

    const results3 = await fetch(
      `${process.env.REACT_APP_URL_WNBA}/v1/app/admin-profile/` + id
    );
    const results4 = await fetch(
      `${process.env.REACT_APP_URL_WNBA}/v1/app/admin-home-page.list/` + id
    );

    if (results.status === 200) {
      const resultDetail = await results.json();
      const result2Detail = await results2.json();
      const result3Detail = await results3.json();
      const result4Detail = await results4.json();
      setTotal1(resultDetail?.user?.total);
      setTotal2(result3Detail?.user?.total);

      const value = buildValue(result2Detail?.record);
      const value1 = buildValue(result4Detail?.record);
      setState(value);
      setState1(value1);
    }
  }

  async function handleClickP() {
    setTab(0);
  }

  async function handleClickNext() {
    setTab(1);
  }

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <div className="flex items-center space-x-2">
        <button
          onClick={handleClickP}
          className="px-3 py-1 bg-gray-200 rounded-md"
        >
          nba ยอดรวม {totals1}
        </button>
        <button
          onClick={handleClickNext}
          className="px-3 py-1 bg-gray-200 rounded-md"
        >
          wnba ยอดรวม {totals2}
        </button>
      </div>

      <Table
        column={[
          {
            name: "#",
            key: "id",
            order: null,
            width: 60,
          },
          {
            name: "ชื่อการแข่ง",
            key: "name",
            order: null,
            width: 360,
          },
          {
            name: "รอบที่ 1",
            type: "color",
            key: "index1",
            order: null,
            width: 192,
          },
          {
            name: "รอบที่ 2",
            type: "color",
            key: "index2",
            order: null,
            width: 192,
          },
          {
            name: "ครึ่งแรก",
            type: "color",
            key: "index3",
            order: null,
            width: 192,
          },
          {
            name: "รอบที่ 3",
            type: "color",
            key: "index4",
            order: null,
            width: 192,
          },
          {
            name: "รอบที่ 4",
            type: "color",
            key: "index5",
            order: null,
            width: 192,
          },
          {
            name: "ผลรวม",
            type: "color",
            key: "index6",
            order: null,
            width: 192,
          },
          {
            name: "สร้างเมื่อ",
            key: "created_at",
            order: null,
            width: 192,
          },
        ]}
        data={tab === 0 ? state : state1}
      />
      <Pagination />
    </div>
  );
};

export default UserDetail;
