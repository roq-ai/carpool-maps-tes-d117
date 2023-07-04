import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { rideBookerValidationSchema } from 'validationSchema/ride-bookers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.ride_booker
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getRideBookerById();
    case 'PUT':
      return updateRideBookerById();
    case 'DELETE':
      return deleteRideBookerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getRideBookerById() {
    const data = await prisma.ride_booker.findFirst(convertQueryToPrismaUtil(req.query, 'ride_booker'));
    return res.status(200).json(data);
  }

  async function updateRideBookerById() {
    await rideBookerValidationSchema.validate(req.body);
    const data = await prisma.ride_booker.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteRideBookerById() {
    const data = await prisma.ride_booker.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
