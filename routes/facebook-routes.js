const request = require('../requests/facebook-requests');
const ensureAuthenticated = require('../middlewares/ensureauth-middleware');

module.exports = app => {
    app.route('/api/v1/campaign/list')
        .get(ensureAuthenticated, app.getAllCampaign);

/*
    app.route('/api/v1/campaign/:campaignId')
        .get(request.validate("getMailInfo"), ensureAuthenticated, app.getSpecificCampaign);
*/

    app.route('/api/v1/campaign/add')
        .post(request.validate("add"), ensureAuthenticated, app.createCampaign);

    app.route('/api/v1/campaign/:campaignId')
        .put(request.validate("update"), ensureAuthenticated, app.updateCampaign);

    app.route('/api/v1/campaign/:campaignId')
        .delete(request.validate("delete"), ensureAuthenticated, app.deleteCampaign);
};
