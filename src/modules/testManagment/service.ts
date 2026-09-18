import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindManyOptions, Like, Repository } from 'typeorm'
import { TestManagement } from './entity'

@Injectable()
export class TestManagementService {
  constructor(
    @InjectRepository(TestManagement)
    private readonly testManagementRepository: Repository<TestManagement>,
  ) {}

  async save(dto: Partial<TestManagement>) {
    if (dto.id) {
      return this.update(dto)
    }
    return this.add(dto)
  }

  async add(dto: Partial<TestManagement>) {
    const entity = this.testManagementRepository.create(dto)
    return this.testManagementRepository.save(entity)
  }

  async update(dto: Partial<TestManagement>) {
    if (!dto.id) {
      throw new Error('数据不存在')
    }

    const old = await this.testManagementRepository.findOne({
      where: { id: dto.id as any },
    })

    if (!old) {
      throw new Error('数据不存在')
    }

    const merged = this.testManagementRepository.merge(old, dto)
    return this.testManagementRepository.save(merged)
  }

  async delete(ids: string | string[]) {
    const arr =
      typeof ids === 'string' ? ids.split(',').filter(Boolean) : ids

    if (!arr.length) {
      return { affected: 0 }
    }

    return this.testManagementRepository.delete(arr)
  }

  async getOne(id: string) {
    return this.testManagementRepository.findOne({
      where: { id },
    })
  }

  async list(query: any = {}) {
    const { keyword, testType, pageNum = 1, pageSize = 10 } = query

    const where: any = {}

    if (testType) {
      where.testType = testType
    }

    if (keyword) {
      where.testCase = Like(`%${keyword}%`)
    }

    const findOptions: FindManyOptions<TestManagement> = {
      where,
      order: { id: 'DESC' },
      skip: (pageNum - 1) * pageSize,
      take: pageSize,
    }

    const [data, total] = await this.testManagementRepository.findAndCount(findOptions)

    return {
      total,
      data,
      _flag: true,
    }
  }
}