const models = require('../models');
const sequelize = require('sequelize');

const { Op } = sequelize;
const { Vaccine } = models;

const create = async (req, res) => {
  const vaccine = await Vaccine.create(req.body);

  if (!vaccine) {
    return res.status(400).send('Something went wrong!');
  }

  return res.status(201).json(vaccine);
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

  if (startDate && !endDate) {
    where.date = {
      [Op.gte]: startDate
    };
  }

  if (endDate && !startDate) {
    where.date = {
      [Op.lte]: endDate,
    };
  }

  if (startDate && endDate) {
    where.date = {
      [Op.and]: [{
        [Op.gte]: startDate,
        [Op.lte]: endDate,
      }],
    };
  }

  const vaccines = await Vaccine.findAndCountAll({
    where,
    include,
    order: [
      ['date', 'DESC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = vaccines.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: vaccines,
  });
};


const getById = async (req, res) => {
  const { id } = req.params;
  const vaccine = await Vaccine.findByPk(id);

  res.status(200).json(vaccine);
};

module.exports = {
  create,
  getAll,
  getById,
};
