import { JobTag, TargetTag } from '../enum';

export interface ResponseLogger {
  id: number;
  connectionId: number;
  isError: boolean;
  jobTag: JobTag;
  targetTag: TargetTag;
  context: string;
  message: string;
  stack: string;
  createdAt: Date;
}

export interface ResponseLoggerProps {
  logs: ResponseLogger[];
  length: number;
}
