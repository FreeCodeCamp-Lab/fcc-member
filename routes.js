'use strict';

const Router = require('xiaolan-router');

let router = new Router();

router.group('member').use('gate').post('','post_user');
router.group('member').use('gate').get('', 'search_user');
module.exports = router;
