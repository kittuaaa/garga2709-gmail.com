const adsSdk = require('facebook-nodejs-business-sdk');
const Campaign = adsSdk.Campaign;
module.exports = function (app) {

    app.getAllCampaign = (req, res) => {
        try {
            const facebook = req.account;
            facebook.getCampaigns(['name', 'objective'], {limit: 20, effective_status : [
                'ACTIVE', 'PAUSED', 'PENDING_REVIEW', 'DISAPPROVED', 'PREAPPROVED', 'PENDING_BILLING_INFO',
                 'CAMPAIGN_PAUSED', 'ARCHIVED', 'ADSET_PAUSED', 'IN_PROCESS', 'WITH_ISSUES'
                ]}).then(campaigns => {
                res.status(200).send({data: campaigns});
            }).catch(err => {
                res.status(500).send({msg: 'Something Went Wrong'});
            });
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'});
            return false;
        }
    };


    app.createCampaign = (req, res) => {
        try {
            const facebook = req.account;
            facebook.createCampaign([], {
                    [Campaign.Fields.name]: req.body.name,
                    [Campaign.Fields.status]: req.body.status ? req.body.status :Campaign.Status.paused,
                    [Campaign.Fields.objective]: req.body.objective ? req.body.objective : Campaign.Objective.page_likes
                }).then(campaign => {
                res.status(200).send({data: campaign});
            }).catch(err => {
                res.status(500).send({msg: 'Something Went Wrong'});
            });
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'});
            return false;
        }
    };

    app.updateCampaign = (req, res) => {
        try {

           const update = new Campaign(req.params.campaignId, {
                [Campaign.Fields.id]: Campaign.id,
                [Campaign.Fields.name]: 'Campaign - Updated' })
                .update();
            update.then(res =>{
                res.status(200).send({data: res});
            }).catch(error => {
                res.status(500).send({msg: 'Something Went Wrong'});
            });
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'});
            return false;
        }
    };

    app.deleteCampaign = (req, res) => {

        try {
            const deleted = new Campaign(req.params.campaignId).delete();
            deleted.then(res => {
               res.status(200).send({msg: 'Deleted'});
            }).catch(error => {
                res.status(500).send({msg: 'Something Went Wrong'});
            });
        } catch (e) {
            res.status(500).send({msg: 'Something Went Wrong'});
        }

    };
};
