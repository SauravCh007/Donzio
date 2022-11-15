import httpResponse from '../services/HttpResponse';
import httpService from '../services/HttpService';
import CustomFunctions from './CustomFunctions';

class authApi {
    isConnected = true;
    generateUrl = (url, extraParam = '', urlParams = {}) => {
        const searchParams = new URLSearchParams(CustomFunctions.cleanObjects(urlParams)).toString();
        let apiEndpoint = url;
        if (extraParam) apiEndpoint = `${apiEndpoint}/${extraParam}`;
        const returnTaskApi = `${apiEndpoint}${searchParams ? '?' + searchParams : ''}`;
        return returnTaskApi;
    };

    getDataFromServer = async endPoint => {
        this.checkNetwork();
        return httpService
            .get(endPoint) // eslint-disable-line
            .then(
                response => {
                    return this.responseHandler(response);
                },
                err => {
                    return this.errorHandler(err);
                },
            );
    };
    postDataToServer = async (endPoint, payload) => {
        this.checkNetwork();
        console.log('endpoint is as follows ', endPoint);
        console.log('payload is as follows ', payload);
        return httpService
            .post(endPoint, payload) // eslint-disable-line
            .then(
                response => {
                    console.log('response is as follows ', response);
                    return this.responseHandler(response);
                },
                err => {
                    return this.errorHandler(err.response);
                },
            );
    };
    putDataToServer = async (endPoint, payload) => {
        this.checkNetwork();
        return httpService
            .put(endPoint, payload) // eslint-disable-line
            .then(
                response => {
                    return this.responseHandler(response);
                },
                err => {
                    return this.errorHandler(err.response);
                },
            );
    };
    deleteDataFromServer = async endPoint => {
        this.checkNetwork();
        return httpService
            .delete(endPoint) // eslint-disable-line
            .then(
                response => {
                    return this.responseHandler(response);
                },
                err => {
                    return this.errorHandler(err);
                },
            );
    };

    responseHandler = response => {
        if (
            response &&
            ((response.data && (response.data.status === 200 || response.data.status === 201)) ||
                response.status === 201 ||
                response.status === 200)
        ) {
            httpResponse.data = response.data;
            httpResponse.success = true;
            return httpResponse;
        }
        httpResponse.success = false;
        httpResponse.data = null;
        httpResponse.message = response && response.data && response.data.message ? response.data.message : '';
        return httpResponse;
    };

    errorHandler = err => {
        httpResponse.success = false;
        httpResponse.data = null;
        httpResponse.message =
            err && err.data && err.data.message ? err.data.message[0] : 'Something went wrong.Please try again later';
        return httpResponse;
    };

    checkNetwork = () => {
        if (!this.isConnected) {
            httpResponse.isConnected = this.isConnected;
            httpResponse.message = 'Please check your internet connection';
            httpResponse.data = null;
            httpResponse.success = false;
            httpResponse.error = 'Network Error';
            return httpResponse;
        }
    };
}

export default new authApi();
