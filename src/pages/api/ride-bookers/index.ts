import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { rideBookerValidationSchema } from 'validationSchema/ride-bookers';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getRideBookers();
    case 'POST':
      return createRideBooker();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRideBookers() {
    const data = await prisma.ride_booker
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'ride_booker'));
    return res.status(200).json(data);
  }

  async function createRideBooker() {
    await rideBookerValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.ride_booker.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
