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