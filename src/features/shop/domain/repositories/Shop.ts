import { ShopEntity as Entity } from '../entities'

export interface ShopRepository {
    getAll: () => Promise<Entity[]>
    getById: (shop_id: string) => Promise<Entity | null>

    save: (entity: Entity) => Promise<Entity | null>
    update: (shop_id: string, entity: Entity) => Promise<Entity | null>
    update_image: (shop_id : string, formData: FormData) => Promise<Entity | null>
    update_field: (shop_id : string, field : string, value : any) => Promise<Entity | null>

    delete: (shop_id: string) => Promise<void | null>    
}
