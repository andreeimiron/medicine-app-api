const models = require('../models');
const sequelize = require('sequelize');

const { Op } = sequelize;
const { History } = models;

const create = async (req, res) => {
  const history = await History.create(req.body);

  if (!history) {
    return res.status(400).send('Something went wrong!');
  }

  return res.status(201).json(history);
};

const getAll = async (req, res) => {
  const {
    startDate,
    endDate,
    solved,
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

  if (solved || solved === false) {
    where.solved = solved;
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

  const history = await History.findAndCountAll({
    where,
    include,
    order: [
      ['date', 'DESC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = history.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: history,
  });
};


const getById = async (req, res) => {
  const { id } = req.params;
  const history = await History.findByPk(id);

  res.status(200).json(history);
};

module.exports = {
  create,
  getAll,
  getById,
};
