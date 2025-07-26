import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import Pagination from "../../components/Pagination";
import Search from "../../components/Search";
import { getData } from "../../lib/api";
import { useLocation } from "react-router-dom";

type RecordState = {
  id: number
  name: string
  user_id: number
  record_data: RecordData
  created_at: string
}

type RecordData = {
  q1: string
  q2: string
  haft: string
  q3: string
  q4: string
  final: string
}

const Records = () => {
  const [state, setState] = useState<RecordState[]>([]) 
  const location = useLocation()

  useEffect(() => {
    reloadService()
  }, [location.search])
  
  async function reloadService() {
    // const results = await getData<RecordState[]>('/record/records')

    // setState(results.map((item) => ({ ...item, ...item.record_data })))
  }

  return (
    <div className="flex flex-col gap-[16px] p-[16px]">
      <Search />
      <Table
        column={[
          {
            name: "ชื่อรายการ",
            key: "name",
            order: null,
            width: 192,
          },
          {
            name: "Q1",
            key: "q1",
            order: null,
            width: 92,
          },
          {
            name: "Q2",
            key: "q2",
            order: null,
            width: 92,
          },
          {
            name: "พัก",
            key: "haft",
            order: null,
            width: 92,
          },
          {
            name: "Q3",
            key: "q3",
            order: null,
            width: 92,
          },
          {
            name: "Q4",
            key: "q4",
            order: null,
            width: 92,
          },
          {
            name: "รวมจบ",
            key: "final",
            order: null,
            width: 92,
          },
          {
            name: "วันที่",
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

export default Records;
