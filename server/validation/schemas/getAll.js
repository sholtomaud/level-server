module.exports = {
    label: 'Get all Records',
    ype: 'array',
    items: [
        {
            description: 'skip',
            type: 'string'
        },
        {
            description: 'limit',
            type: 'string'
        }
    ],
    minItems: 0,
    maxItems: 2
};
