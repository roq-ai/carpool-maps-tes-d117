import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { paymentManagerValidationSchema } from 'validationSchema/payment-managers';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.payment_manager
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getPaymentManagerById();
    case 'PUT':
      return updatePaymentManagerById();
    case 'DELETE':
      return deletePaymentManagerById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getPaymentManagerById() {
    const data = await prisma.payment_manager.findFirst(convertQueryToPrismaUtil(req.query, 'payment_manager'));
    return res.status(200).json(data);
  }

  async function updatePaymentManagerById() {
    await paymentManagerValidationSchema.validate(req.body);
    const data = await prisma.payment_manager.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deletePaymentManagerById() {
    const data = await prisma.payment_manager.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
