import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

type TableProps<T> = {
    column: Column[];
    data: T[];
}

type Column = {
    name: string;
    key: string;
    type?: string;
    order: 'asc' | 'desc' | null;
    width: number;
}

const ColumnComponent = (column: Column[]) => {
    return (column.map((item) => <div className='font-semibold flex flex-col items-center' style={{ width: item.width }} >{item.name}</div>))
}

function DataComponent<T>(item: T, columns: Column[]) {
    return (columns.map((column) =>
        column.type != 'color'
            ? <div className='font-thin text-[#6A727E] flex flex-col items-center' style={{ width: column.width }} >{item?.[column.key as never]}</div>
            : <div className='font-thin text-[#fff] flex flex-col items-center' style={{ width: column.width, backgroundColor: (item?.[column.key as never] as any).color }} >{(item?.[column.key as never] as any).text}</div>
    ))
}

export default function Table<T>({ column, data }: TableProps<T>) {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = (id: any) => {
        navigate(`${location.pathname}/${id}`);
    };

    return (
        <div className='w-[calc(70vw)] flex overflow-auto rounded-xl border h-[calc(100vh-220px)]'>
            <div className='flex flex-col'>
                <div className='flex h-[48px] items-center gap-[16px] border-b px-[16px]'>
                    {ColumnComponent(column)}
                </div>

                {data.map((item: any) => <div onClick={() => handleClick(item.user_id)} className='flex h-[48px] items-center gap-[16px] px-[16px]'>{DataComponent(item, column)}</div>)}
            </div>
        </div >
    )
}
