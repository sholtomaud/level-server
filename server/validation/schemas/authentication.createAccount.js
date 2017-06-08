module.exports = {
    label: 'Account',
    type: 'array',
    items: [
        {
            description: 'schema for an account',
            type: 'object',
            required: ['userName', 'password', 'companyId'],
            additionalProperties: false,
            properties: {
                userName: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                companyId: {
                    type: 'string'
                }
            }
        }
    ],
    minItems: 1,
    maxItems: 1
};
