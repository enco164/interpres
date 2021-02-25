import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TransferService } from './transfer.service';

@Controller()
export class TransferController {
  constructor(private readonly transferService: TransferService) {}

  @MessagePattern({ cmd: 'hello' })
  getHello(): string {
    return this.transferService.getHello();
  }
}
