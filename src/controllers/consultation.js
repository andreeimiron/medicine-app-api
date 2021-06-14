const models = require('../models');
const sequelize = require('sequelize');

const { Op } = sequelize;
const { Consultation } = models;

const create = async (req, res) => {
  const consultation = await Consultation.create(req.body);

  if (!consultation) {
    return res.status(400).send('Something went wrong!');
  }

  return res.status(201).json(consultation);
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

  const consultations = await Consultation.findAndCountAll({
    where,
    include,
    order: [
      ['date', 'DESC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = consultations.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: consultations,
  });
};


const getById = async (req, res) => {
  const { id } = req.params;
  const consultation = await Consultation.findByPk(id);

  res.status(200).json(consultation);
};

module.exports = {
  create,
  getAll,
  getById,
};
