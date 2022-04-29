import axios from 'axios';
import { Settings } from '../Settings';


class RemoteCommandAPI {

  private host: string;
  private port: number;
  private baseAPI;

  constructor(host?: string, port?: number) {
    this.host = host ? host : Settings.BACKEND_APISERVER_HOST;
    this.port = port ? port : Settings.BACKEND_APISERVER_PORT;
    this.baseAPI = axios.create({
      baseURL: `http://${this.host}:${this.port}/api/v1`
    });
  }

  async authTest(accessToken?: string) {
    return axios.get(`http://${this.host}:${this.port}/auth_test`)
  }

  async takePicture(deviceName: string, s3_url?: string, accessToken?: string) {
    const params: any = {
      "cmd": "TAKE_PICTURE",
    }
    if (s3_url) {
      params["params"] = {
        "s3_fileptah": s3_url
      }
    }
    return this.baseAPI.post(`remote_command/${deviceName}`, params)
  }

}

export default RemoteCommandAPI;
