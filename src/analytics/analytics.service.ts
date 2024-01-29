import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Analytics, SalesAnalytics } from './entities/analytics.entity';

@Injectable()
export class AnalyticsService {
  constructor(private readonly prismaDb: PrismaService) {}

  async GetUserAnalytics() {
    const last12Months: Analytics[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const count = await this.prismaDb.user.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      last12Months.push({ month: monthYear, count });
    }
    return last12Months;
  }

  async GetProductAnalyticsForAdmin() {
    const last12Months: Analytics[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const count = await this.prismaDb.product.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      last12Months.push({ month: monthYear, count });
    }
    return last12Months;
  }

  async GetProductAnalyticsForSeller(storeId: string) {
    const last12Months: Analytics[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const count = await this.prismaDb.product.count({
        where: {
          storeId: storeId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      last12Months.push({ month: monthYear, count });
    }
    return last12Months;
  }

  async getOrderAnalyticsForAdmin() {
    const last12Months: Analytics[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const count = await this.prismaDb.order.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      last12Months.push({ month: monthYear, count });
    }
    return { last12Months };
  }

  async storeAnalyticsForAdmin() {
    const last12Months: Analytics[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const count = await this.prismaDb.store.count({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      last12Months.push({ month: monthYear, count });
    }
    return last12Months;
  }

  async sellAnalyticsForAdmin() {
    const last12Months: SalesAnalytics[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const income = await this.prismaDb.sale.aggregate({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: {
          netPrice: true,
        },
      });
      last12Months.push({ month: monthYear, income: +income });
    }
    return last12Months;
  }

  async sellAnalyticsForStore(storeId: string) {
    const last12Months: SalesAnalytics[] = [];
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    for (let i = 11; i >= 0; i--) {
      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() - i * 28,
      );

      const startDate = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() - 28,
      );

      const monthYear = endDate.toLocaleString('default', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const income = await this.prismaDb.sale.aggregate({
        where: {
          storeId,
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
        _sum: {
          netPrice: true,
        },
      });
      last12Months.push({ month: monthYear, income: +income });
    }
    return last12Months;
  }
}
