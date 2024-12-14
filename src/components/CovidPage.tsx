import { Button, Col, Row, Select, Space } from "antd";
import React, { FC, useMemo, useState } from "react";
import { CovidByProvince } from "../models/user";
import { Tile } from "./Tile";
import { useQueryClient } from "@tanstack/react-query";

type props = {
  data: CovidByProvince[];
  isEnabled: boolean;
  setEnabled: (data: boolean) => void;
};
export const CovidPage: FC<props> = ({ data, isEnabled, setEnabled }) => {
  const provinces = useMemo(() => {
    return data.map((x) => x.province);
  }, [data]);

  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);

  const dataDisplay = useMemo<CovidByProvince | null>(() => {
    return data?.find((x) => x.province === selectedProvince) ?? null;
  }, [selectedProvince, data]);

  const queryClient = useQueryClient();
  const cTime = queryClient.getQueryData<number>(["cTime"]);

  const onSelect = (v: string) => {
    setSelectedProvince(v);
  };

  return (
    <Row style={{ margin: 8 }}>
      <Space direction="vertical">
        <Row>
          <Button onClick={() => setEnabled(!isEnabled)}>
            Toggle to {isEnabled ? `Disable` : `Enable`}
          </Button>
        </Row>
        <Row>
          <Col span={24}>
            <Select style={{ width: 300 }} onSelect={onSelect}>
              {provinces.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </Select>
          </Col>
        </Row>
        {dataDisplay && (
          <>
            <Row>
              <Col span={24}>
                <h1>{dataDisplay.txn_date}</h1>
              </Col>
            </Row>
            <Row wrap={true} justify="center">
              <Tile title="NEW CASE" value={dataDisplay.new_case} />
              <Tile
                title="NEW CASE (exc. abroad)"
                value={dataDisplay.new_case_excludeabroad}
              />
              <Tile title="NEW DEATH" value={dataDisplay.new_death} />
              <Tile title="TOTAL" value={dataDisplay.total_case} />
              <Tile
                title="TOTAL (exc. abroad)"
                value={dataDisplay.total_case_excludeabroad}
              />
              <Tile title="TOTAL DEATH" value={dataDisplay.total_death} />
            </Row>
            <Row>
              <Col span={24}>
                <h1>UPDATE TIME: {dataDisplay.update_date}</h1>
                <h2>INTERVAL TIME: {cTime}</h2>
              </Col>
            </Row>
          </>
        )}
      </Space>
    </Row>
  );
};
