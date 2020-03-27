const { body, param } = require('express-validator');
const commonUtility = require('../utility/common-utility');

const validate = method => {
    switch (method) {
        case 'add':
            return [
                body('name')
                    .exists()
                    .isString()
                    .isLength({ min: 3, max: 254 })
                    .withMessage('name is too small or long.')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Name has some invalid characters.'),
                body('status')
                    .exists()
                    .withMessage('Email is not available')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Status has some invalid characters.'),
                body('objective')
                    .exists()
                    .withMessage('Objective is not available')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Status has some invalid characters.'),
            ];
        case 'update':
            return [
                param('campaignId')
                    .exists()
                    .withMessage('Campaign Id is not available')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Campaign Id has some invalid characters.'),
                body('nane')
                    .exists()
                    .isString()
                    .isLength({ min: 3, max: 254 })
                    .withMessage('name is too small or long.')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Name has some invalid characters.'),
                body('status')
                    .exists()
                    .withMessage('Email is not available')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Status has some invalid characters.'),
                body('objective')
                    .exists()
                    .withMessage('Objective is not available')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Status has some invalid characters.'),
            ];
        case 'delete':
            return [
                param('campaignId')
                    .exists()
                    .withMessage('Campaign Id is not available')
                    .custom(value => commonUtility.checkIfTextIsAlphaNumeric(value))
                    .withMessage('Campaign Id has some invalid characters.'),
            ];
    }
};

module.exports = { validate };
