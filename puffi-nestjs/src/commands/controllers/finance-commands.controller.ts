import {
  RpcHandler,
  RpcMethodHandler,
  RpcPayload,
  IRpcHandler,
  RpcMethod,
} from 'nestjs-jrpc';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.authguard';
import { FinanceCommandsService } from '../services/finance-commands.service';
import { FinanceDTO } from '../dtos/finance.dto';
import { FinanceEvaluation } from 'src/llm/data models/financeEvaluation.entity';
@RpcHandler({
  method: 'finance',
})
@UseGuards(JwtAuthGuard)
export class FinanceRpcHandler implements IRpcHandler {
  constructor(private financeCommandsService: FinanceCommandsService) {}

  async invoke(
    @RpcMethod() method: string,
    @RpcPayload() payload: any,
  ): Promise<any> {
    switch (method) {
      case 'addFinance':
        return this.addFinance(payload);
      case 'getLLMPrediction':
        return this.getLLMPrediction();
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  @RpcMethodHandler('addFinance')
  private async addFinance(payload: FinanceDTO): Promise<void> {
    await this.financeCommandsService.addFinanceCommand(payload);
  }

  @RpcMethodHandler('getLLMPrediction')
  private async getLLMPrediction(): Promise<FinanceEvaluation | null> {
    return await this.financeCommandsService.getLLMFinanceCommand();
  }
}
