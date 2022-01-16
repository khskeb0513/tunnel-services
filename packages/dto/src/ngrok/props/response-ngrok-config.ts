export interface ResponseNgrokConfig {
  id: number;
  key: string;
  value: string;
}

export interface ResponseNgrokConfigProps {
  configs: ResponseNgrokConfig[];
}
