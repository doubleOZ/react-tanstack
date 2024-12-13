import React, { useMemo, useState } from "react"
import { Station } from "../models/user"
import { Button, Col, Row, Select, Space } from "antd"
import { useQuery } from "@tanstack/react-query"
import { StationService } from "../services/api"

type props = {
    data: Station[],
    setEnabled: (data: boolean) => void
}

export const StationPage: React.FC<props> = ({data, setEnabled}) => {
    const stations = useMemo(() => {
            return data.map((x) => x.dustboy_name_en);
        }, [data])

    const [selectedStation, setSelectedStation] = useState<string | null>(null);
    
    const onSelect = (v: string) => {
        setSelectedStation(v)
        }   
    return (
        <Row style={{margin: 8}}>
            <Space direction="vertical">
                <Row>
                    {/* <Button onClick={() => setEnabled(!isEnabled)}>Toggle to {isEnabled ? `Disable` : `Enable`}</Button> */}
                </Row>
                <Row>
                    <Col span={24}>
                        <Select style={{width: 300}} onSelect={onSelect}>
                            {stations.map((x) => (
                                <option key={x} value={x}>
                                    {x}
                                </option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                </Space>
                </Row>
    )
}