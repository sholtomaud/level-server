module.exports = {
    label: 'Import batch',
    type: 'array',
    items: [
        {
            description: 'schema for a Record',
            type: 'object',
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
