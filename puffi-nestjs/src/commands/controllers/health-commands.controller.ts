import {
  RpcHandler,
  RpcMethodHandler,
  RpcPayload,
  IRpcHandler,
  RpcMethod,
} from 'nestjs-jrpc';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.authguard';
import { HealthEvaluation } from 'src/llm/data models/healthEvaluation.entity';
import { HealthDTO } from '../dtos/health.dto';
import { HealthCommandsService } from '../services/health-commands-service';
@RpcHandler({
  method: 'health',
})
@UseGuards(JwtAuthGuard)
export class HealthRpcHandler implements IRpcHandler {
  constructor(private healthCommandsService: HealthCommandsService) {}

  async invoke(
    @RpcMethod() method: string,
    @RpcPayload() payload: any,
  ): Promise<any> {
    switch (method) {
      case 'addHealth':
        return this.addHealth(payload);
      case 'getLLMPrediction':
        return this.getLLMPrediction();
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  @RpcMethodHandler('addHealth')
  private async addHealth(payload: HealthDTO): Promise<void> {
    await this.healthCommandsService.addHealthCommand(payload);
  }

  @RpcMethodHandler('getLLMPrediction')
  private async getLLMPrediction(): Promise<HealthEvaluation | null> {
    return await this.healthCommandsService.getLLMHealthCommand();
  }
}
