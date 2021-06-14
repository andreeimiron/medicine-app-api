const models = require('../models');
const sequelize = require('sequelize');

const { Op } = sequelize;
const { Request } = models;

const create = async (req, res) => {
  const { userId } = req;
  const request = await Request.create({
    ...req.body,
    userId,
  });

  if (!request) {
    return res.status(400).send('Something went wrong!');
  }

  return res.status(201).json(request);
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
    });
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

  const requests = await Request.findAndCountAll({
    where,
    include,
    order: [
      ['date', 'DESC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = requests.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: requests,
  });
};


const getById = async (req, res) => {
  const { id } = req.params;
  const request = await Request.findByPk(id);

  res.status(200).json(request);
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);

  const request = await Request.findOne({
    where: { id },
  });

  if (!request) {
    return res.status(400).json({
      message: 'Cererea nu a putut fi gasita'
    });
  }

  const updatedRequest = await request.update(req.body);

  res.status(201).json(updatedRequest);
}

module.exports = {
  create,
  getAll,
  getById,
  update,
};
