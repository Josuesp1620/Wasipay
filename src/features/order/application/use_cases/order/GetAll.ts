import { OrderEntity as Entity } from "@/features/order/domain/entities"
import { OrderRepository as Repository } from "@/features/order/domain/repositories"

export class GetAllUseCase {

    private readonly _repository: Repository

    constructor(
        repository: Repository
    ) {
        this._repository = repository
    }

    async run(shop_id: string): Promise<Entity[] | null > {
        const entities: Entity[] | null = await this._repository.getAll(shop_id)
        return entities
    }
}
