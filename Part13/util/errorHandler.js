// middleware/errorHandler.js
const errorHandler = (error, req, res, next) => {
  console.error(error.name, error.message)

  // Sequelize validation errors (e.g. year < 1991 or > current year)
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      error: 'Validation error',
      details: error.errors.map(e => e.message)
    })
  }

  // Sequelize unique constraint errors (e.g. duplicate key)
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(400).json({
      error: 'Unique constraint error',
      details: error.errors.map(e => e.message)
    })
  }

  // JWT errors
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'invalid token' })
  }

  // Default fallback
  return res.status(500).json({ error: 'Something went wrong', details: error.message })
}

module.exports = { errorHandler }
