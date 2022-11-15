import { Subject } from "rxjs"; // eslint-disable-line

class SharedService {
  static networkChanged = new Subject();
  static isLogOut = new Subject();
}

export default SharedService;
