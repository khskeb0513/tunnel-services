import { ResponseLogger, ResponseLoggerProps } from 'dto';

export class ResponseLoggerDto implements ResponseLoggerProps {
  logs: ResponseLogger[];
  length: number;
}
