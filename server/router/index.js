'use strict';

const SeaLion = require('sea-lion');
const router = new SeaLion();

router.add(require('./static'));
router.add(require('./service'));

module.exports = router;
