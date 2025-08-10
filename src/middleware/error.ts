import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '../types';

export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  const response: ApiResponse = {
    success: false,
    message: 'Internal server error',
    errors: []
  };

  if (error.name === 'ValidationError') {
    response.message = 'Validation error';
    response.errors = Object.values(error.errors).map((err: any) => err.message);
    res.status(400).json(response);
    return;
  }

  if (error.code === 'P2002') { // Prisma unique constraint error
    response.message = 'Resource already exists';
    response.errors = ['Duplicate entry found'];
    res.status(409).json(response);
    return;
  }

  if (error.code === 'P2025') { // Prisma record not found
    response.message = 'Resource not found';
    res.status(404).json(response);
    return;
  }

  if (error.statusCode) {
    response.message = error.message || 'Request failed';
    res.status(error.statusCode).json(response);
    return;
  }

  res.status(500).json(response);
};

export const notFound = (req: Request, res: Response): void => {
  const response: ApiResponse = {
    success: false,
    message: `Route ${req.originalUrl} not found`
  };

  res.status(404).json(response);
};
