import { Component } from 'react';

export default class Api extends Component {
    static baseUrl = Api.getBaseUrl();
    static sendOtp = `${Api.baseUrl}send-otp/`;
    static loginVerifyOtp = `${Api.baseUrl}login-verify-otp/`;
    static toBeTasks = `${Api.baseUrl}to-be-tasks/`;
    static profile = `${Api.baseUrl}profile/`;
    static roles = `${Api.baseUrl}roles/`;
    static userOptions = `${Api.baseUrl}user-options/`;
    static roles = `${Api.baseUrl}roles/`;
    static employee = `${Api.baseUrl}employee/`;
    static optionList = `${Api.baseUrl}option-list/`;
    static tasks = `${Api.baseUrl}tasks/`;
    static content = `${Api.baseUrl}content/`;
    static register = `${Api.baseUrl}newRegister/`;
    static companyApi = `${Api.baseUrl}company/`;
    static taskAsign = `${Api.baseUrl}task-asign/`;
    static GetCountry = `${Api.baseUrl}getcountry/`;
    static GetRegisteredUser = `${Api.baseUrl}get-info-by-mobile/`;
    // static aboutUs = `${Api.baseUrl}about-us/`;


    
    constructor(props) {
        super(props);
        this.state = {};
        this.getBaseUrl = this.getBaseUrl.bind(this);
    }

    // Get base URL of APIs
    static getBaseUrl() {
        let url = '';
        const env = 'dev';
        switch (env) {
            case 'production':
                url = '';
                break;
            // Default: development server
            default:
                // url = "https://poc.reviewtestlink.com/api/v1/";
                url = 'https://quality-web-programming.com/projects/f11/donzio/api/';
                break;
        }
        return url;
    }

    environment;
}
