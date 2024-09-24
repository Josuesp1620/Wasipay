import { Minus, Plus, Search, ShoppingCart } from 'lucide-react';
import { Link } from "react-router-dom";
import { ProductItemEntity } from '@/features/product/domain/entities';
import { CartHelper } from '@/common/components/cart/helper';
import { formatCurrency, formatDiscountPrice } from '@/common/utils/format';

export const ProductsComponent = ({ props, helper }: { props:any, helper:  any }) => {

    const { addProductCart, decreaseProductQuantity, increaseProductQuantity } = CartHelper()
    
    if (!helper.data || helper.data.length === 0) {
        return (
            <div className="noresult">
                <div className="py-6 text-center">
                    <Search className="size-6 mx-auto text-sky-500 fill-sky-100 dark:sky-500/20" />
                    <h5 className="mt-2 mb-1">{props.t("Sorry! No Results Found")}</h5>
                    <p className="mb-0 text-slate-500 dark:text-zinc-200">{props.t("We are working to bring you the best deals from this store!")}</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`grid grid-cols-2 mt-5 md:grid-cols-3 [&.gridView]:grid-cols-1 xl:grid-cols-4 2xl:grid-cols-5 group [&.gridView]:xl:grid-cols-1 gap-x-5 ${!helper.list && "gridView"}`} id="cardGridView">

            {(helper.data || []).map((item: ProductItemEntity) => (
                <div key={item?.product?.id} className="card md:group-[.gridView]:flex relative">
                    <div className="relative group-[.gridView]:static p-3 md:p-5 group-[.gridView]:p-2">
                        <div className="group-[.gridView]:p-3 group-[.gridView]:bg-slate-100 dark:group-[.gridView]:bg-zink-600 group-[.gridView]:inline-block rounded-md">
                            <img src={item?.product?.images && item?.product?.images.length !== 0 ? item?.product?.images[0].url : ''} alt="" className="group-[.gridView]:h-16" />
                        </div>
                    </div>
                    <div className="p-3 md:card-body !pt-0 md:group-[.gridView]:flex group-[.gridView]:!p-5 group-[.gridView]:gap-3 group-[.gridView]:grow">
                        <div className="group-[.gridView]:grow">
                            <h6 className="mb-1 text-left transition-all duration-200 text-xs md:text-15 hover:text-custom-500 line-clamp-1  xl:line-clamp-2 2xl:line-clamp-1">
                                <Link to={`/product/${item?.product?.id}`}>{item.product?.name}</Link>
                            </h6>                            
                            <h5 className="mt-4 text-16">{formatDiscountPrice(item.product!)}
                                {item.product?.discount! !== 0 && (
                                    <small className="ml-2 font-normal line-through text-slate-500 dark:text-zink-200">{formatCurrency.format(item.product?.price!)}</small>
                                )}                                
                            </h5>
                        </div>

                        <div className="flex items-center gap-2 mt-4 group-[.gridView]:mt-0 group-[.gridView]:self-end">
                            {item.in_cart ? (
                                <div className="flex items-center justify-between gap-3 w-full">
                                    <div className="inline-flex text-center input-step">
                                        <button onClick={() => decreaseProductQuantity(item.product!.id!)} type="button" className="border size-9 leading-[15px] minus bg-white dark:bg-zink-700 dark:border-zink-500 rounded-l transition-all duration-200 ease-linear border-slate-200 text-slate-500 dark:text-zink-200 hover:bg-custom-500 dark:hover:bg-custom-500 hover:text-custom-50 dark:hover:text-custom-50 hover:border-custom-500 dark:hover:border-custom-500 focus:bg-custom-500 dark:focus:bg-custom-500 focus:border-custom-500 dark:focus:border-custom-500 focus:text-custom-50 dark:focus:text-custom-50">
                                            <Minus className="inline-block size-4"></Minus>
                                        </button>
                                        <input type="number" className="w-12 text-center h-9 border-y product-quantity dark:bg-zink-700 focus:shadow-none dark:border-zink-500" value={item.quantity} min="0" max="100" readOnly />
                                        <button onClick={() => increaseProductQuantity(item.product!.id!)} type="button" className="transition-all duration-200 ease-linear bg-white border dark:bg-zink-700 dark:border-zink-500 rounded-r size-9 border-slate-200 plus text-slate-500 dark:text-zink-200 hover:bg-custom-500 dark:hover:bg-custom-500 hover:text-custom-50 dark:hover:text-custom-50 hover:border-custom-500 dark:hover:border-custom-500 focus:bg-custom-500 dark:focus:bg-custom-500 focus:border-custom-500 dark:focus:border-custom-500 focus:text-custom-50 dark:focus:text-custom-50">
                                            <Plus className="inline-block size-4"></Plus>
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <button type="button" onClick={() => addProductCart(item?.product?.id!)} className="w-full bg-white border-dashed text-slate-500 btn border-slate-500 hover:text-slate-500 hover:bg-slate-50 hover:border-slate-600 focus:text-slate-600 focus:bg-slate-50 focus:border-slate-600 active:text-slate-600 active:bg-slate-50 active:border-slate-600 dark:bg-zink-700 dark:text-zink-200 dark:border-zink-400 dark:ring-zink-400/20 dark:hover:bg-zink-600 dark:hover:text-zink-100 dark:focus:bg-zink-600 dark:focus:text-zink-100 dark:active:bg-zink-600 dark:active:text-zink-100"><ShoppingCart className="inline-block size-3 leading-none" /> <span className="align-middle">Add to Cart</span></button>
                            )}
                            <a href="#!" className="hidden md:flex text-xl w-[50px] items-center justify-center text-white transition-all duration-200 ease-linear bg-green-500 rounded size-9 hover:bg-green-500 dark:bg-pink-500/20 dark:hover:bg-pink-500/30">
                                <i className="ri-whatsapp-line"></i>
                            </a>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
