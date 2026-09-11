import React from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

const partnerLogos = [
    { src: '/axis.png', alt: 'Axis Mutual Fund' },
    { src: '/birla.jpeg', alt: 'Birla Mutual Fund' },
    { src: '/care.png', alt: 'Care Health Insurance' },
    { src: '/gic.jpeg', alt: 'GIC Housing Finance' },
    { src: '/hdfc.png', alt: 'HDFC Mutual Fund' },
    { src: '/icici.png', alt: 'ICICI Prudential Mutual Fund' },
    { src: '/kotak.png', alt: 'Kotak Mutual Fund' },
    { src: '/lic.png', alt: 'LIC' },
    { src: '/nippon.png', alt: 'Nippon India Mutual Fund' },
    { src: '/sbi.png', alt: 'SBI Mutual Fund' },
    { src: '/starhealth.png', alt: 'Star Health Insurance' },
    { src: '/tata.jpeg', alt: 'Tata Mutual Fund' },
    { src: '/uti.png', alt: 'UTI Mutual Fund' },
];

const Partners = ({ className }: { className?: string }) => {
    return (
        <section className={cn("py-8 sm:py-14", className)}>
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center justify-center text-center mb-8 sm:mb-10">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider mb-1.5">
                        Institutional Partnerships
                    </span>
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-stone-900 tracking-tight">
                        Direct Products from India&apos;s Trusted Institutions
                    </h2>
                </div>
                <div
                    className="w-full inline-flex flex-nowrap overflow-hidden group
                    [mask-image:_linear-gradient(to_right,transparent_0,_black_32px,_black_calc(100%-32px),transparent_100%)] sm:[mask-image:_linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]"
                >
                    <ul 
                        className="flex items-center justify-center md:justify-start [&_li]:mx-2.5 sm:[&_li]:mx-3.5 
                        animate-infinite-scroll group-hover:[animation-play-state:paused]"
                    >
                        {partnerLogos.map((logo, index) => (
                            <li key={index} className="flex-shrink-0">
                                <div className="h-20 sm:h-24 w-40 sm:w-44 rounded-2xl border border-stone-200/80 bg-white flex items-center justify-center p-3 sm:p-4 shadow-2xs hover:border-stone-300 hover:shadow-xs transition-all duration-200 overflow-hidden">
                                    <Image 
                                        src={logo.src} 
                                        alt={logo.alt} 
                                        width={120} 
                                        height={50} 
                                        className="max-h-11 sm:max-h-12 max-w-[105px] sm:max-w-[118px] w-auto h-auto object-contain" 
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                    <ul 
                        className="flex items-center justify-center md:justify-start [&_li]:mx-2.5 sm:[&_li]:mx-3.5 
                        animate-infinite-scroll group-hover:[animation-play-state:paused]" 
                        aria-hidden="true"
                    >
                        {partnerLogos.map((logo, index) => (
                            <li key={index} className="flex-shrink-0">
                                <div className="h-20 sm:h-24 w-40 sm:w-44 rounded-2xl border border-stone-200/80 bg-white flex items-center justify-center p-3 sm:p-4 shadow-2xs hover:border-stone-300 hover:shadow-xs transition-all duration-200 overflow-hidden">
                                    <Image 
                                        src={logo.src} 
                                        alt={logo.alt} 
                                        width={120} 
                                        height={50} 
                                        className="max-h-11 sm:max-h-12 max-w-[105px] sm:max-w-[118px] w-auto h-auto object-contain" 
                                    />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Partners;