module.exports = {
    label: 'Import batch',
    type: 'array',
    items: [
        {
            description: 'array of items',
            type: 'array',
            additionalProperties: false
        },
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
    maxItems: 3
};
