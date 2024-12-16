import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, Card, Row, Col, Spin, Alert } from "antd";
import { Station, StationValue } from "./models/user";
import { StationService } from "./services/api";

// Color mapping for air quality levels
const AIR_QUALITY_COLORS = {
  Good: "#4CAF50", // Green
  Moderate: "#FFC107", // Yellow
  "Very Good": "#2196F3", // Blue
  default: "#808080", // Gray for unknown or undefined status
  Unhealthy: "#f26522", // Orange
  "Very Unhealthy": "#cd0000", // Red
};

const AirQualityMonitor: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  const {
    data: stations,
    isPending: isStationsLoading,
    isError: isStationsError,
  } = useQuery<Station[]>({
    queryKey: ["stations"],
    queryFn: StationService.getAll,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: airQualityData,
    isPending: isAirQualityLoading,
    isError: isAirQualityError,
  } = useQuery<StationValue>({
    queryKey: ["airQuality", selectedStation],
    queryFn: () => StationService.getStationValues(selectedStation!),
    enabled: !!selectedStation,
    staleTime: 1000 * 60 * 10,
  });

  const handleStationChange = (value: string) => {
    setSelectedStation(value);
  };

  const formatValue = (value: number | string | null, unit: string = "") => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;
    return numValue !== null && !isNaN(numValue)
      ? `${numValue}${unit}`
      : "Data not available";
  };

  // Get background color based on air quality status
  const getBackgroundColor = (status?: string) => {
    return (
      AIR_QUALITY_COLORS[status as keyof typeof AIR_QUALITY_COLORS] ||
      AIR_QUALITY_COLORS.default
    );
  };

  if (isStationsLoading) {
    return <Spin size="large" tip="Loading stations..." />;
  }

  if (isStationsError) {
    return (
      <Alert
        message="Error"
        description="Failed to load stations"
        type="error"
        showIcon
      />
    );
  }

  return (
    <div>
      <Row gutter={16}>
        <Col span={12}>
          <Select
            showSearch
            style={{ width: "100%" }}
            placeholder="Select a station"
            onChange={handleStationChange}
            value={selectedStation}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option?.children
                ? String(option.children)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                : false
            }
          >
            {stations
              ?.slice()
              .sort((a, b) =>
                a.dustboy_name_en.localeCompare(b.dustboy_name_en)
              )
              .map((station) => (
                <Select.Option
                  key={station.dustboy_id}
                  value={station.dustboy_id}
                >
                  {station.dustboy_name_en}
                </Select.Option>
              ))}
          </Select>
        </Col>
      </Row>

      {selectedStation && (
        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            {isAirQualityLoading ? (
              <Spin size="large" tip="Loading air quality data..." />
            ) : isAirQualityError ? (
              <Alert
                message="Error"
                description="Failed to load air quality data"
                type="error"
                showIcon
              />
            ) : airQualityData ? (
              <>
                <Card title="Air Quality Details">
                  <Row gutter={16}>
                    <Col span={8}>
                      <div>
                        PM2.5: {formatValue(airQualityData.pm25, " µg/m³")}
                      </div>
                      <div>
                        PM10: {formatValue(airQualityData.pm10, " µg/m³")}
                      </div>
                    </Col>
                    <Col span={8}>
                      <div>
                        Temperature: {formatValue(airQualityData.temp, "°C")}
                      </div>
                      <div>
                        Humidity: {formatValue(airQualityData.humid, "%")}
                      </div>
                    </Col>
                  </Row>
                </Card>

                {/* Air Quality Description with Dynamic Background */}
                <Card
                  title="Air Quality Description"
                  style={{
                    marginTop: 16,
                    backgroundColor: getBackgroundColor(
                      airQualityData.th_title_en
                    ),
                    color:
                      airQualityData.th_title_en === "Moderate"
                        ? "black"
                        : "white",
                  }}
                >
                  <div>
                    {airQualityData?.th_caption_en ||
                      "No description available"}
                  </div>
                </Card>
              </>
            ) : null}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AirQualityMonitor;
