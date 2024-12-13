export type UserDetail = {
  name: string;
  username: string;
  shortName: string;
  age: number;
  height: number;
  telNo: string;
};

export type CovidByProvince = {
  txn_date: string;
  province: string;
  new_case: number;
  total_case: number;
  new_case_excludeabroad: number;
  total_case_excludeabroad: number;
  new_death: number;
  total_death: number;
  update_date: string;
};

export type Station = {
  dustboy_id: string;
  dustboy_uri: string;
  dustboy_alias: string;
  dustboy_name_th: string;
  dustboy_name_en: string;
  dustboy_lat: string;
  dustboy_lng: string;
  dustboy_status: string;
  dustboy_pv: string;
  dustboy_version: string;
  db_email: string;
  db_co: string;
  db_mobile: string;
  db_addr: string;
  db_status: string;
  db_model: string;
}

export interface StationValue {
  id:                    string;
  dustboy_id:            string;
  dustboy_uri:           string;
  dustboy_name:          string;
  dustboy_name_en:       string;
  dustboy_lat:           string;
  dustboy_lon:           string;
  pm10:                  number;
  pm25:                  number;
  wind_speed:            null;
  wind_direction:        null;
  atmospheric:           null;
  pm10_th_aqi:           number;
  pm10_us_aqi:           string;
  pm25_th_aqi:           number;
  pm25_us_aqi:           string;
  temp:                  string;
  humid:                 string;
  us_aqi:                string;
  us_color:              string;
  us_dustboy_icon:       string;
  us_title:              string;
  us_title_en:           string;
  us_caption:            string;
  us_caption_en:         string;
  th_aqi:                number;
  th_color:              string;
  th_dustboy_icon:       string;
  th_title:              string;
  th_title_en:           string;
  th_caption:            string;
  th_caption_en:         string;
  daily_pm10:            number;
  daily_pm10_th_aqi:     number;
  daily_pm10_us_aqi:     string;
  daily_pm25:            number;
  daily_pm25_th_aqi:     number;
  daily_pm25_us_aqi:     string;
  daily_th_title:        string;
  daily_th_title_en:     string;
  daily_us_title:        string;
  daily_us_title_en:     string;
  daily_th_caption:      string;
  daily_th_caption_en:   string;
  daily_us_caption:      string;
  daily_us_caption_en:   string;
  daily_th_color:        string;
  daily_us_color:        string;
  daily_th_dustboy_icon: string;
  daily_us_dustboy_icon: string;
  daily_temp:            string;
  daily_humid:           string;
  daily_wind_speed:      null;
  daily_wind_direction:  null;
  daily_atmospheric:     null;
  province_id:           string;
  province_code:         string;
  log_datetime:          Date;
}