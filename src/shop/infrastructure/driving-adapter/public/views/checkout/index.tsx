import React from 'react';

// Icon
import { ShoppingBag, ChevronLeft, MoveRight } from 'lucide-react';

import { Link } from 'react-router-dom';
import BreadCrumb from '@/common/BreadCrumb';
import { LayoutPublic } from '@/common/layout_2';
import { CheckoutHelper } from './helper';
import { ShippingInformation } from './components/ShippingInformation';
import { OrderSummary } from './components/OrderSummary';
import { PaymentMethodEntity } from '@/shop/domain/entities/PaymentMethod';

export const CheckouView = () => {

    const helper = CheckoutHelper()


    return (
        <LayoutPublic>
            <React.Fragment>
                <BreadCrumb title='Checkout' pageTitle='Ecommerce' />
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-x-5">
                    <div className="xl:col-span-12">
                        <div className="flex gap-1 px-4 py-3 mb-5 text-sm text-green-500 border border-green-200 rounded-md md:items-center bg-green-50 dark:bg-green-400/20 dark:border-green-500/50">
                            <ShoppingBag className="h-4 shrink-0" /> <p>The minimum order requirement is <b>$1,800</b>. To meet this threshold, please add additional products with a combined value of <b>$300</b>.</p>
                        </div>
                    </div>
                    <div className="xl:col-span-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="grow">
                                <Link to="#!" className="transition-all duration-300 ease-linear text-custom-500 hover:text-custom-600"><ChevronLeft className="inline-block size-4 align-middle ltr:mr-1 rtl:ml-1 rtl:rotate-180" /> <span className="align-middle">Back to Cart</span></Link>
                            </div>
                            <div className="shrink-0">
                                <button type="button" className="text-white btn bg-custom-500 border-custom-500 hover:text-white hover:bg-custom-600 hover:border-custom-600 focus:text-white focus:bg-custom-600 focus:border-custom-600 focus:ring focus:ring-custom-100 active:text-white active:bg-custom-600 active:border-custom-600 active:ring active:ring-custom-100 dark:ring-custom-400/20"><span className="align-middle">Place Order</span> <MoveRight className="inline-block size-4 align-middle ltr:ml-1 rtl:mr-1 rtl:rotate-180" /></button>
                            </div>
                        </div>

                        <ShippingInformation helper={helper} />


                        <div className="card">
                            <div className="card-body">
                                <h6 className="mb-4 text-15">Payment Method</h6>

                                <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">

                                    {helper.shop_profile && helper.shop_profile.payment_method?.map((item:PaymentMethodEntity) => (
                                        <div className="flex items-center gap-3" key={item.id}>
                                            <input onChange={(e) => helper.setPaymentMethod(e.target.value)} id={item.id} className="size-4 border rounded-full appearance-none cursor-pointer bg-slate-100 border-slate-200 dark:bg-zink-600 dark:border-zink-500 checked:bg-purple-500 checked:border-purple-500 dark:checked:bg-purple-500 dark:checked:border-purple-500 checked:disabled:bg-purple-400 checked:disabled:border-purple-400 peer" type="radio" name="payment_method" value={item.id} />
                                            <label htmlFor={item.id} className="flex flex-col gap-4 p-5 border rounded-md cursor-pointer md:flex-row border-slate-200 dark:border-zink-500 peer-checked:border-purple-500 dark:peer-checked:border-purple-700 grow">
                                                <span className="shrink-0">
                                                    {/* <img src={delivery1} alt="" className="h-12" /> */}
                                                </span>
                                                <span className="grow">
                                                    <span className="block mb-1 font-semibold text-15">{item.name}</span>
                                                    <span className="text-slate-500 dark:text-zink-200">{item.description}</span>
                                                </span>
                                                <span className="shrink-0">
                                                    <span className="block text-lg font-semibold">S/.{helper.cart_price.total_price!.toFixed(2)}</span>
                                                </span>
                                            </label>
                                        </div>       
                                        ))
                                    }                                                                 
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    <div className="xl:col-span-4">
                        <OrderSummary helper={helper} />                   
                    </div>
                </div>
            </React.Fragment>
        </LayoutPublic>
    );
};