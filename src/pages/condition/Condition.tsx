import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getData, postData } from '../../lib/api'
import Input from '../../components/Input'
import Button from '../../components/Button'

type JsonResponse = {
    json_response: ConditionState
}

type ConditionState = {
    results: Result[]
}

type Result = number

const Condition = () => {
    const [state, setState] = useState<ConditionState | null>(null)
    const location = useLocation()

    useEffect(() => {
        reloadService()
    }, [location.search])

    async function reloadService() {
        const results = await getData<JsonResponse>('/v1/app/condition')

        setState(results.json_response)
    }

    async function saveCondition() {
        const results = await postData('/v1/app/condition', state)

        console.log('====================================');
        console.log(results);
        console.log('====================================');
    }

    return (
        <div className='flex flex-col gap-[16px] p-[8px] md:p-[16px] w-full'>
            <div className=' self-end'>
                <Button
                    text={'บันทึก'}
                    onClick={saveCondition}
                />
            </div>
            <div> แก้ไขลำดับขั้น </div>
            <div className="flex overflow-x-scroll w-[calc(70vw)] scrollbar-hide">
                {state?.results.map((item, index) =>
                    <div className='w-[100px] mr-[16px] flex gap-[8px] flex-col'>
                        <Input
                            label={'ขั้นที่ : ' + (index + 1)}
                            text={item + ""}
                            handleChange={(event) => {
                                const newResults = [...state.results];
                                newResults[index] = +event.target.value;
                                setState({ ...state, results: newResults });
                            }}
                        />

                        <Button
                            text={'ลบ'}
                            color="bg-red-100"
                            onClick={() => {
                                const newResults = state.results.filter((_, i) => i !== index);
                                setState({ ...state, results: newResults });
                            }}
                        />
                    </div>
                )}
            </div>
            <Button
                text={'+ เพิ่มลำดับขั้น'}
                onClick={() => {
                    setState({ results: [...state?.results ?? [], 0] })
                }}
            />
        </div>
    )
}

export default Condition