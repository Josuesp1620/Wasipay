import React from 'react';
import { BadgeCheck } from 'lucide-react';
import { ProfileInfoHelper } from './helper';
import Skeleton from 'react-loading-skeleton';

const ShopProfileInfo = ({ className }: { className: string }) => {
    
    const helper = ProfileInfoHelper()

    return (
        <React.Fragment>
            <div className={className}>
                <div className='grid grid-cols-1 place-items-center'>
                    <div className='lg:col-span-2 2xl:col-span-1 inline-block'>
                        <div className='relative inline-block size-28 rounded-full shadow-md bg-slate-100 profile-user'>
                            <img
                                src={
                                    helper.shop_profile
                                        ? helper.shop_profile.image.url
                                        : '#'
                                }
                                alt=''
                                className='object-cover border-0 rounded-full img-thumbnail user-profile-image'
                            />                            
                        </div>
                    </div>
                    <div className='lg:col-span-10 2xl:col-span-9 text-center'>
                        <h5 className='mb-1 gap-2'>
                            {helper.shop_profile ? (
                                helper.shop_profile.name
                            ) : (
                                <Skeleton />
                            )}
                            <BadgeCheck className='ml-1 inline-block size-4 text-sky-500 fill-sky-100 dark:fill-custom-500/20' />
                        </h5>                        
                        <ul className='flex flex-wrap gap-3 mt-4 text-center items-center justify-center divide-x divide-slate-200 dark:divide-zink-500'>
                            <li className='px-5'>
                                <h5>
                                    {helper.shops ? (
                                        helper.shops.length
                                    ) : (
                                        <Skeleton />
                                    )}
                                    +
                                </h5>
                                <p className='text-slate-500 dark:text-zink-200'>
                                    Shops
                                </p>
                            </li>
                        </ul>
                        <div className='flex gap-2 mt-4 items-center justify-center'>
                            <a
                                href={
                                    helper.shop_profile && helper.shop_profile.social_media
                                        ? helper.shop_profile.social_media.tiktok
                                        : '#'
                                }
                                target='_blank'
                                className='text-lg flex items-center justify-center text-[#37C5BB] transition-all duration-200 ease-linear bg-[#C0F2EF] rounded size-9 hover:bg-[#9CE9E5]'
                            >
                                <i className='ri-tiktok-line'></i>
                            </a>
                            <a
                                href={
                                    helper.shop_profile && helper.shop_profile.social_media
                                        ? helper.shop_profile.social_media.instagram
                                        : '#'
                                }
                                target='_blank'
                                className='text-lg flex items-center justify-center text-pink-500 transition-all duration-200 ease-linear bg-pink-100 rounded size-9 hover:bg-pink-200'
                            >
                                <i className='ri-instagram-line'></i>
                            </a>
                            <a
                                href={
                                    helper.shop_profile && helper.shop_profile.social_media
                                        ? helper.shop_profile.social_media.facebook
                                        : '#'
                                }
                                target='_blank'
                                className='text-lg flex items-center justify-center transition-all duration-200 ease-linear rounded size-9 text-sky-500 bg-sky-100 hover:bg-sky-200'
                            >
                                <i className='ri-facebook-fill'></i>
                            </a>
                            {/* <a href={helper.shop_profile ? "#" : helper.shop_profile!.social_media?.youtube} target='_blank' className='text-lg flex items-center justify-center text-red-500 transition-all duration-200 ease-linear bg-red-100 rounded size-9 hover:bg-red-200'>
                                <i className='ri-youtube-line'></i>
                            </a> */}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ShopProfileInfo;
