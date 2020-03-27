const fs = require('fs');
const adsSdk = require('facebook-nodejs-business-sdk');
const AUTH_INFO_PATH = './configs/auth.json';

module.exports = (req, res, next) => {
    try {
        // Load client secrets from a local file.
        fs.readFile(AUTH_INFO_PATH, (err, content) => {
            if (err) console.log('Error loading auth file:', err);
            // Validate the token then will proceed further.
            authorize(JSON.parse(content)).then(status => {
                req.account = status;
                next();
            }).catch(err => {
                console.log('err=============', err);
                res.status(401).send({msg: 'Invalid Token'});
            });
        });
    } catch (e) {
        console.log('error--------->', e);
        res.status(500).send({msg: 'Something Went Wrong'});
    }
};

function authorize(credentials) {
    try {
        const {access_token, account_id} = credentials;
        const api = adsSdk.FacebookAdsApi.init(access_token);
        const AdAccount = adsSdk.AdAccount;
        const account = new AdAccount(account_id);
        return new Promise((resolve, reject) => {
            getAccountStatus(account).then(status => {
                // console.log('getting account info', JSON.stringify(status));
                resolve(account);
            }).catch(err => {
                reject(err);
            });
        });
    } catch (e) {
        return false;
    }
}

function getAccountStatus(account) {
    try {
        return new Promise((resolve, reject) => {
            account.get([
                "account_id", "account_status"
            ]).then(info => {
                // console.log('=========getting result=========', info);
                resolve(info);
            }).catch(err => {
                // console.log('========getting error while fetching validaty==========', err);
                reject(err);
            });
        });
    } catch (e) {
        return false;
    }
}
