import {
  RpcHandler,
  RpcMethodHandler,
  RpcPayload,
  IRpcHandler,
  RpcMethod,
} from 'nestjs-jrpc';
import { ProductivityCommandsService } from '../services/productivity-commands.service';
import { ProductivityDTO } from '../dtos/productivity.dto';
import { ProductivityEvaluation } from 'src/llm/data models/productivityEvaluation.dataModel';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.authguard';
@RpcHandler({
  method: 'productivity',
})
@UseGuards(JwtAuthGuard)
export class ProductivityRpcHandler implements IRpcHandler {
  constructor(
    private productivityCommandsService: ProductivityCommandsService,
  ) {}

  async invoke(
    @RpcMethod() method: string,
    @RpcPayload() payload: any,
  ): Promise<any> {
    switch (method) {
      case 'addProductivity':
        return this.addProductivity(payload);
      case 'getLLMPrediction':
        return this.getLLMPrediction();
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  @RpcMethodHandler('addProductivity')
  private async addProductivity(payload: ProductivityDTO): Promise<void> {
    await this.productivityCommandsService.addProductivityCommand(payload);
  }

  @RpcMethodHandler('getLLMPrediction')
  private async getLLMPrediction(): Promise<ProductivityEvaluation | null> {
    return await this.productivityCommandsService.getLLMPredictionCommand();
  }
}
