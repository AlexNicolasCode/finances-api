import { Module } from '@nestjs/common';

import { AuthModule, AccountBalanceModule } from './modules';

@Module({
  imports: [AuthModule, AccountBalanceModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
