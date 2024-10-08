import { ChangeEvent } from "react";

import { useQueryClient } from "@tanstack/react-query";
import { useShop } from "@/features/shop/infrastructure/driving-adapter/hooks/useShop";
import { ShopEntity } from "@/features/shop/domain/entities";
import { ProductItemEntity } from "@/features/product/domain/entities";
import { OrderEntity } from "@/features/order/domain/entities";
import { useProduct } from "@/features/product/infrastructure/driving-adapter/hooks/useProduct";
import { useOrder } from "@/features/order/infrastructure/driving-adapter/hooks/useOrder";
import { toast } from "sonner";
import { ImplementationAxios  as AxiosShop } from "@/features/shop/infrastructure/implementation/axios";
import { UpdateImageUseCase } from "@/features/shop/application/use_cases";

export const ProfileInfoHelper = () => {

    const queryClient =  useQueryClient()

    const shopRepository = new AxiosShop()
    const shopUseCase = new UpdateImageUseCase(shopRepository)   
    const { getShop } = useShop();
    const { getAll: getAllProduct } = useProduct();
    const { getAll: getAllOrder } = useOrder();
    
    const query_shop_profile : ShopEntity = getShop()
    const query_product_list : ProductItemEntity[] = getAllProduct()
    const query_orders_list : OrderEntity[] = getAllOrder()

    
    const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
        try {    
            const file = Array.from(event.target.files!);
            if (file.length !== 0) {                            
                const formData = new FormData()
                formData.append("images", file[0])        

                const data = await shopUseCase.run(query_shop_profile?.id!, formData)
                
                queryClient.cancelQueries({ queryKey: ['shop_profile'] })
                queryClient.setQueryData(['shop_profile'], data)                 
                toast.success("Datos Actualizados Correctamente.")
            }                        
        }catch(e) {            
            toast.success("Error al actualizar la foto.")
        }      
    };

    return {
        handleImageChange,
        query_shop_profile,
        query_product_list,
        query_orders_list,
    }
}