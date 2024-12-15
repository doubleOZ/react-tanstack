import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Select, Card, Row, Col, Spin, Alert } from "antd";
import { Station, StationValue } from "./models/user";
import { StationService } from "./services/api";

// Function to fetch stations

const AirQualityMonitor: React.FC = () => {
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

  // Query to fetch all stations
  const {
    data: stations,
    isPending: isStationsLoading,
    isError: isStationsError,
  } = useQuery<Station[]>({
    queryKey: ["stations"],
    queryFn: StationService.getAll,
    // Optional: keep data for 5 minutes before refetching
    staleTime: 1000 * 60 * 5,
  });

  // Query to fetch air quality data for selected station
  const {
    data: airQualityData,
    isPending: isAirQualityLoading,
    isError: isAirQualityError,
  } = useQuery<StationValue>({
    // Only fetch when a station is selected
    queryKey: ["airQuality", selectedStation],
    queryFn: () => StationService.getStationValues(selectedStation!),
    // Only enable the query when a station is selected
    enabled: !!selectedStation,
    // Keep air quality data for 10 minutes
    staleTime: 1000 * 60 * 10,
  });

  // Handler for station selection
  const handleStationChange = (value: string) => {
    setSelectedStation(value);
  };

  // Render loading state for stations
  if (isStationsLoading) {
    return <Spin size="large" tip="Loading stations..." />;
  }

  // Render error state for stations
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
            style={{ width: "100%" }}
            placeholder="Select a station"
            onChange={handleStationChange}
            value={selectedStation}
          >
            {stations?.map((station) => (
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
              <Card title="Air Quality Details">
                <Row gutter={16}>
                  <Col span={8}>
                    <div>PM2.5: {airQualityData.pm25} µg/m³</div>
                    <div>PM10: {airQualityData.pm10} µg/m³</div>
                  </Col>
                  <Col span={8}>
                    <div>Temperature: {airQualityData.temp}°C</div>
                    <div>Humidity: {airQualityData.humid}%</div>
                  </Col>
                </Row>
              </Card>
            ) : null}
          </Col>
        </Row>
      )}
    </div>
  );
};

export default AirQualityMonitor;
