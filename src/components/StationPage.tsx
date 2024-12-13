import React, { useMemo } from "react"
import { Station } from "../models/user"

type props = {
    data: Station[],
    setEnabled: (data: boolean) => void
}

export const StationPage: React.FC<props> = ({data, setEnabled}) => {
    const stations = useMemo(() => {
            return data.map((x) => x.dustboy_name_en);
        }, [data])
    return (
        <div>{stations}</div>
    )
}