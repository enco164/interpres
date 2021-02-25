import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @Inject('TRANSFER') private readonly clientTransfer: ClientProxy,
  ) {}

  getHello() {
    return this.clientTransfer.send<string>({ cmd: 'hello' }, {});
  }
}
