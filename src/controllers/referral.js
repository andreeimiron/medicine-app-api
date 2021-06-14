const models = require('../models');
const sequelize = require('sequelize');

const { Op } = sequelize;
const { Referral } = models;

const create = async (req, res) => {
  const referral = await Referral.create(req.body);

  if (!referral) {
    return res.status(400).send('Something went wrong!');
  }

  return res.status(201).json(referral);
};

const getAll = async (req, res) => {
  const {
    startDate,
    endDate,
    priority,
    userId,
    doctorId,
    page: queryPage,
    limit: queryLimit,
  } = req.query;

  const limit = queryLimit ? parseInt(queryLimit) : 0;
  const page = parseInt(queryPage || 1)
  const offset = (page - 1) * limit;
  const where = {};
  const include = [];

  if (userId) {
    where.userId = parseInt(userId);
  }

  if (doctorId) {
    include.push({
      model: models.User,
      required: true,
      where: {
        doctorId: parseInt(doctorId)
      },
    })
  }

  if (priority || priority === false) {
    where.priority = priority;
  }

  if (startDate && !endDate) {
    where.releaseDate = {
      [Op.gte]: startDate
    };
  }

  if (endDate && !startDate) {
    where.releaseDate = {
      [Op.lte]: endDate,
    };
  }

  if (startDate && endDate) {
    where.releaseDate = {
      [Op.and]: [{
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      }],
    };
  }

  const referrals = await Referral.findAndCountAll({
    where,
    include,
    order: [
      ['releaseDate', 'DESC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = referrals.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: referrals,
  });
};


const getById = async (req, res) => {
  const { id } = req.params;

  const referral = await Referral.findOne({
    where: { id },
    include: {
      model: models.User,
      required: true,
      include: {
        model: models.User,
        required: true
      }
    }
  });

  res.status(200).json(referral);
};

module.exports = {
  create,
  getAll,
  getById,
};
