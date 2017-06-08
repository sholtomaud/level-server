module.exports = {
    '/heartbeat': {
        GET: function(request, response) {
            response.end('OK\n');
        }
    }
};
