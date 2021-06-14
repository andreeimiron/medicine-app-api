const models = require('../models');
const sequelize = require('sequelize');

const { Op } = sequelize;
const { Prescription } = models;

const create = async (req, res) => {
  const prescription = await Prescription.create(req.body);

  if (!prescription) {
    return res.status(400).send('Something went wrong!');
  }

  return res.status(201).json(prescription);
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

  const prescriptions = await Prescription.findAndCountAll({
    where,
    include,
    order: [
      ['releaseDate', 'DESC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = prescriptions.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: prescriptions,
  });
};


const getById = async (req, res) => {
  const { id } = req.params;

  const prescription = await Prescription.findOne({
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

  res.status(200).json(prescription);
};

module.exports = {
  create,
  getAll,
  getById,
};
