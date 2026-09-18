import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TestManagement } from './entity'
import { TestManagementController } from './controller'
import { TestManagementService } from './service'

@Module({
  imports: [TypeOrmModule.forFeature([TestManagement])],
  controllers: [TestManagementController],
  providers: [TestManagementService],
  exports: [TestManagementService],
})
export class TestManagementModule {}