import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req } from '@nestjs/common'
import { BaseController } from 'src/common/BaseController'
import { TestManagement } from './entity'
import { TestManagementService } from './service'
import { QueryListDto } from 'src/common/dto'

@Controller('system/testManagement')
export class TestManagementController extends BaseController<TestManagement, TestManagementService> {
  constructor(service: TestManagementService) {
    super(service)
  }

  @Post('add')
  async add(@Body() body, @Req() req) {
    return this.service.add(body)
  }

  @Post('save')
  async save(@Body() body, @Req() req) {
    return this.service.save(body)
  }

  @Put('update')
  async update(@Body() body, @Req() req) {
    return this.service.update(body)
  }

  @Delete('del/:ids')
  async del(@Param('ids') ids: string) {
    return this.service.delete(ids)
  }

  @Get('list')
  async list(@Query() query: QueryListDto) {
    return this.service.list(query)
  }

  @Get('getOne/:id')
  async getOne(@Param('id') id: string) {
    return this.service.getOne(id)
  }
}