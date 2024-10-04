import { Injectable } from '@nestjs/common';
import { ProductivityRepository } from './productivity.repository';
import { Productivity } from './data models/productivity.dataModel';
import { EntityManager } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ProductivityDTO } from 'src/commands/dtos/productivity.dto';

//You might ask why we have a service and a productivty, where the service is not doing much. It is not, yes, however this project is for practice and to understand
//code organization better for bigger more complex projects.
// The service in essence gets the data from the repository, does some business logic and returns it to the controller or another service.

@Injectable()
export class ProductivityService {
  constructor(
    @InjectRepository(ProductivityRepository)
    private productivityRepository: ProductivityRepository,
  ) {}

  async addProductivityService(
    productivityDTO: ProductivityDTO,
    em?: EntityManager,
  ): Promise<void> {
    try {
      // Add new productivity
      await this.productivityRepository.addProductivity(productivityDTO, em);
    } catch (error) {
      console.log(error);
    }
  }

  async getLatestProductivitiesService(
    limit: number = 4,
    em?: EntityManager,
  ): Promise<Productivity[]> {
    return this.productivityRepository.getLatestProductivities(limit, em);
  }

  async getProductivityByIdService(id: number): Promise<Productivity> {
    return this.productivityRepository.getProductivityById(id);
  }
}
