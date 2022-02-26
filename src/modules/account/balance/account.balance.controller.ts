import { Controller, Get, Inject, Param } from '@nestjs/common';

import { HttpResponse } from 'src/presentation/protocols';
import { badRequest, ok } from 'src/presentation/helpers';
import { LoadAccountBalance } from 'src/domain/usecases';

@Controller('account/balance')
export class AccountBalanceController {
  constructor(
    @Inject('ACCOUNT_BALANCE') private readonly loadAccountBalance: LoadAccountBalance,
  ) {}

  @Get()
  async handle(@Param('accessToken') accessToken: LoadAccountBalance.Params): Promise<HttpResponse> {
    const result = await this.loadAccountBalance.load(accessToken)
    if (!result) return badRequest(new Error('Account Balance not found'))
    return ok(result)
  }
}
