const models = require('../models');
const sequelize = require('sequelize');

const { Op } = sequelize;
const { SickLeave } = models;

const create = async (req, res) => {
  const sickLeave = await SickLeave.create(req.body);

  if (!sickLeave) {
    return res.status(400).send('Something went wrong!');
  }

  return res.status(201).json(sickLeave);
};

const getAll = async (req, res) => {
  const {
    startDate,
    endDate,
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

  if (startDate) {
    where.startDate = {
      [Op.gte]: startDate
    };
  }

  if (endDate) {
    where.endDate = {
      [Op.lte]: endDate,
    };
  }

  const sickLeaves = await SickLeave.findAndCountAll({
    where,
    include,
    order: [
      ['startDate', 'DESC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = sickLeaves.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: sickLeaves,
  });
};


const getById = async (req, res) => {
  const { id } = req.params;

  const sickLeave = await SickLeave.findOne({
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

  res.status(200).json(sickLeave);
};

module.exports = {
  create,
  getAll,
  getById,
};
