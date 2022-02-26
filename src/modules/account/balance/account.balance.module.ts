import { Module } from '@nestjs/common';
import { makeDbLoadAccountBalance } from 'src/main/factories/usecases/load.account.balance';
import { AccountBalanceController } from './account.balance.controller';

const accountBalanceFactory = {
  provide: 'ACCOUNT_BALANCE',
  useFactory: () => {
    return makeDbLoadAccountBalance()
  }
}

@Module({
  imports: [],
  controllers: [AccountBalanceController],
  providers: [accountBalanceFactory],
})
export class AccountBalanceModule {}
