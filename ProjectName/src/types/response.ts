import {HttpStatusCode} from 'axios';

export interface HttpResponse<T> {
  status: HttpStatusCode;
  message: string;
  data: T;
  description: string;
}
