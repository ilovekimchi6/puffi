import {
  RpcHandler,
  RpcMethodHandler,
  RpcPayload,
  IRpcHandler,
  RpcMethod,
} from 'nestjs-jrpc';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/strategies/jwt.authguard';
import { RelationshipsDTO } from '../dtos/relationships.dto';
import { RelationshipsCommandsService } from '../services/relationships-commands.service';
import { RelationshipsEvaluation } from 'src/llm/data models/relationshipsEvaluation.entity';
@RpcHandler({
  method: 'relationships',
})
@UseGuards(JwtAuthGuard)
export class RelationshipsRpcHandler implements IRpcHandler {
  constructor(
    private relationshipsCommandsService: RelationshipsCommandsService,
  ) {}

  async invoke(
    @RpcMethod() method: string,
    @RpcPayload() payload: any,
  ): Promise<any> {
    switch (method) {
      case 'addRelationships':
        return this.addProductivity(payload);
      case 'getLLMPrediction':
        return this.getLLMPrediction();
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  @RpcMethodHandler('addRelationships')
  private async addProductivity(payload: RelationshipsDTO): Promise<void> {
    await this.relationshipsCommandsService.addRelationshipsCommand(payload);
  }

  @RpcMethodHandler('getLLMPrediction')
  private async getLLMPrediction(): Promise<RelationshipsEvaluation | null> {
    return await this.relationshipsCommandsService.getLLMRelationshipsCommand();
  }
}
