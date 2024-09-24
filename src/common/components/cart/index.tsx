import React from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector } from "@/core/redux/hooks";
import Drawer from "@/common/components/Drawer";
import { ProductItem } from "./components/Product";
import Authorization, { LoggedIn, LoggedOut } from "@/common/security/Authorization";
import { formatCurrency } from "@/common/utils/format";
import { ProductItemEntity } from "@/features/product/domain/entities";

const CartComponent = ({ show, handleDrawer }: any) => {

    const cart_products : ProductItemEntity[] | undefined = useAppSelector((state) => state.cartReducer.products)    
    const cart_price = useAppSelector((state) => state.cartReducer)

    return (
        <React.Fragment>
            <Drawer show={show} onHide={handleDrawer} id="cartSidePenal" drawer-end="true" className="fixed inset-y-0 flex flex-col w-full transition-transform duration-300 ease-in-out transform bg-white shadow dark:bg-zink-600 right-0 md:w-96 z-drawer">
                <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-zink-500">
                    <div className="grow">
                        <h5 className="mb-0 text-16">
                            Shopping Cart 
                            <span className="inline-flex items-center justify-center size-5 ml-1 text-[11px] font-medium border     rounded-full text-white bg-custom-500 border-custom-500">
                                {cart_products?.length}
                            </span>
                        </h5>
                    </div>
                    <div className="shrink-0">
                        <Drawer.Header data-drawer-close="cartSidePenal" className="transition-all duration-150 ease-linear text-slate-500 hover:text-slate-800">
                            <X className="size-4"></X>
                        </Drawer.Header>
                    </div>
                </div>

                <div>
                    <div className="h-[calc(100vh_-_370px)] p-4 overflow-y-auto product-list">
                        <div className="flex flex-col gap-4">
                            {
                                (cart_products || [])?.map((item: ProductItemEntity) => (
                                    <ProductItem item={item} key={item.product?.id}/>
                                ))
                            }
                        </div>
                    </div>

                    <div className="p-4 border-t border-slate-200 dark:border-zink-500">

                        <table className="w-full mb-3 ">
                            <tbody className="table-total">
                                <tr>
                                    <td className="py-2">Sub Total :</td>
                                    <td className="text-right cart-subtotal">{formatCurrency.format(cart_price.subtotal_price!)}</td>
                                </tr>
                                {/* <tr>
                                    <td className="py-2">Shipping Charge :</td>
                                    <td className="text-right cart-shipping">${charge}</td>
                                </tr> */}
                                <tr>
                                    <td className="py-2">Estimated Tax (18.0%) : </td>
                                    <td className="text-right cart-tax">{formatCurrency.format(cart_price.total_tax!)}</td>
                                </tr>
                                <tr className="font-semibold">
                                    <td className="py-2">Total : </td>
                                    <td className="text-right cart-total">{formatCurrency.format(cart_price.total_price!)}</td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="flex items-center justify-between gap-3">
                            
                            <Link to="/" onClick={handleDrawer} className="w-full text-white btn bg-slate-500 border-slate-500 hover:text-white hover:bg-slate-600 hover:border-slate-600 focus:text-white focus:bg-slate-600 focus:border-slate-600 focus:ring focus:ring-slate-100 active:text-white active:bg-slate-600 active:border-slate-600 active:ring active:ring-slate-100 dark:ring-slate-400/10">Continue Shopping</Link>
                            
                            <Authorization>
                                <LoggedIn>
                                    <Link to="/checkout" className="w-full text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20">Checkout</Link>                                    
                                </LoggedIn>
                                <LoggedOut>
                                    <Link to="/login" className="w-full text-white bg-red-500 border-red-500 btn hover:text-white hover:bg-red-600 hover:border-red-600 focus:text-white focus:bg-red-600 focus:border-red-600 focus:ring focus:ring-red-100 active:text-white active:bg-red-600 active:border-red-600 active:ring active:ring-red-100 dark:ring-custom-400/20">Checkout</Link>                                    
                                </LoggedOut>
                            </Authorization>

                        </div>
                    </div>
                </div>
            </Drawer>
        </React.Fragment>
    );
};

export default CartComponent;