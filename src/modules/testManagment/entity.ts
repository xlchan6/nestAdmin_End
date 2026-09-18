import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { IsNotEmpty, MaxLength } from 'class-validator'

@Entity('sys_test_case')
export class TestManagement {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: string

  @Column({ comment: '测试类型' })
  @MaxLength(50)
  @IsNotEmpty()
  testType: string

  @Column({ comment: '测试 case' })
  @MaxLength(200)
  testCase: string

  @Column({ comment: '备注', nullable: true })
  @MaxLength(200)
  remark: string
}