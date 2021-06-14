const models = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const { Op } = require('sequelize');

const { User } = models;
const { jwtSecretKey } = require('../config');
const { sendLoginDetails } = require('../utils/utils')

const create = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({
    where: { email }
  });

  if (user) {
    return res.status(400).json({
      message: 'Aceasta adresa de email este asociata unui alt utilizator',
    });
  }

  const password = Math.random().toString(36).slice(-8)
  const createdUser = await User.create({
    ...req.body,
    password
  });
  const currentUser = createdUser.get();
  delete currentUser.password;
  const token = jwt.sign(currentUser, jwtSecretKey, { expiresIn: '30 days' });
  currentUser.token = token;

  await sendLoginDetails(currentUser.firstName, email, password);

  res.status(200).json(currentUser);
};

const login = async (req, res) => {
  const message = 'Datele de autentificare sunt incorecte';
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email },
    raw: true,
  });

  if (!user) {
    return res.status(400).json({ message });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message });
  }

  delete user.password;
  const token = jwt.sign(user, jwtSecretKey, { expiresIn: '30 days' });
  user.token = token;

  res.status(200).json(user);
};

const update = async (req, res) => {
  const { userId } = req;
  const id = parseInt(req.params.id);

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    return res.status(400).json({
      message: 'Utilizatorul nu a putut fi gasit'
    });
  }

  if (id !== userId && userId !== user.doctorId) {
    return res.status(403).json({
      message: 'Nu este permisa modificarea datelor'
    });
  }

  const userData = req.body;
  const { currentPassword, newPassword } = req.body;
  if (currentPassword && newPassword) {
    const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Parola incorecta',
      });
    }

    userData.password = newPassword;
  }




  const updatedUser = await user.update(userData);
  delete updatedUser.password;

  res.status(201).json(updatedUser);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id);
  delete user.password;

  res.status(200).json(user);
};

const getByIdWithDoctor = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id },
    include: {
      model: models.User,
      required: true,
      where: {
        doctorId: parseInt(doctorId)
      },
    },
    raw: true,
  });
  delete user.password;

  res.status(200).json(user);
};

const getAll = async (req, res) => {
  const {
    doctorId,
    search,
    page: queryPage,
    limit: queryLimit,
  } = req.query;

  const limit = queryLimit ? parseInt(queryLimit) : 0;
  const page = parseInt(queryPage || 1)
  const offset = (page - 1) * limit;
  const where = {};

  if (doctorId) {
    where.doctorId = parseInt(doctorId);
  }

  if (search) {
    const searchTerms = search.toLowerCase().split(' ');

    where[Op.or] = [{
      firstName: {
        [Op.iLike]: {
          [Op.any]: searchTerms,
        }
      }
    }, {
      lastName: {
        [Op.iLike]: {
          [Op.any]: searchTerms,
        }
      }
    }];
  }

  const users = await User.findAndCountAll({
    where,
    order: [
      ['lastName', 'ASC'],
      ['firstName', 'ASC']
    ],
    limit,
    offset,
    distinct: true,
  });
  const totalRows = users.count;

  res.status(200).json({
    totalPages: Math.ceil(totalRows / limit),
    totalRows,
    data: users,
  });
};


const search = async (req, res) => {
  const { searchTerm } = req.params;

  const users = await User.findAll({
    where: {
      [Op.and]: [
        sequelize.where(
          sequelize.fn('concat', sequelize.col('firstName'), ' ', sequelize.col('lastName')), {
            [Op.iLike]: `%${searchTerm.toLowerCase()}%`
          }
        )
      ]
    },
    attributes: {exclude: ['password']},
    distinct: true,
  });

  res.status(200).json(users);
};

module.exports = {
  create,
  login,
  update,
  getById,
  getAll,
  search,
  getByIdWithDoctor
};
