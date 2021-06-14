const router = require('express').Router();

const certificateRoutes = require('./certificate');
const consultationRoutes = require('./consultation');
const historyRoutes = require('./history');
const prescriptionRoutes = require('./prescription');
const referralRoutes = require('./referral');
const requestRoutes = require('./request');
const sickLeaveRoutes = require('./sickLeave');
const userRoutes = require('./user');
const vaccineRoutes = require('./vaccine');

router.use('/certificate', certificateRoutes);
router.use('/consultation', consultationRoutes);
router.use('/history', historyRoutes);
router.use('/prescription', prescriptionRoutes);
router.use('/referral', referralRoutes);
router.use('/request', requestRoutes);
router.use('/sickLeave', sickLeaveRoutes);
router.use('/user', userRoutes);
router.use('/vaccine', vaccineRoutes);

module.exports = router;
