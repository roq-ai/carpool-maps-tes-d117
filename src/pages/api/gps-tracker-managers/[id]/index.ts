import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { gpsTrackerManagerValidationSchema } from 'validationSchema/gps-tracker-managers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.gps_tracker_manager
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getGpsTrackerManagerById();
    case 'PUT':
      return updateGpsTrackerManagerById();
    case 'DELETE':
      return deleteGpsTrackerManagerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getGpsTrackerManagerById() {
    const data = await prisma.gps_tracker_manager.findFirst(convertQueryToPrismaUtil(req.query, 'gps_tracker_manager'));
    return res.status(200).json(data);
  }

  async function updateGpsTrackerManagerById() {
    await gpsTrackerManagerValidationSchema.validate(req.body);
    const data = await prisma.gps_tracker_manager.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteGpsTrackerManagerById() {
    const data = await prisma.gps_tracker_manager.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
