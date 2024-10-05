import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { RelationshipsRepository } from './relationships.repository';
import { RelationshipsDTO } from 'src/commands/dtos/Relationships.dto';
import { Relationships } from './data models/relationships.dataModel';

@Injectable()
export class RelationshipsService {
  constructor(
    @InjectRepository(RelationshipsRepository)
    private relationshipsRepository: RelationshipsRepository,
  ) {}

  async addRelationshipsService(
    relationshipsDTO: RelationshipsDTO,
    em?: EntityManager,
  ): Promise<void> {
    try {
      // Add new productivity
      await this.relationshipsRepository.addRelationships(relationshipsDTO, em);
    } catch (error) {
      console.log(error);
    }
  }

  async getLatestRelationshipsService(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Relationships[]> {
    return this.relationshipsRepository.getLatestRelationships(limit, em);
  }

  async getRelationshipsByIdService(id: number): Promise<Relationships> {
    return this.relationshipsRepository.getRelationshipsById(id);
  }
}
