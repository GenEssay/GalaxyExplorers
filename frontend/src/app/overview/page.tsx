import * as React from "react";

interface ImageProps {
    src: string;
    alt: string;
    className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className }) => (
    <img loading="lazy" src={src} alt={alt} className={className} />
);

interface TextProps {
    children: React.ReactNode;
    className?: string;
}

const Text: React.FC<TextProps> = ({ children, className }) => (
    <div className={className}>{children}</div>
);

const MyComponent: React.FC = () => {
    const images1 = [
        { src: "/lock.png", alt: "" },
        { src: "/lock.png", alt: "" },
        { src: "book.png", alt: "" },
        { src: "/lock.png", alt: "" },
        { src: "/lock.png", alt: "" },
    ];

    const images2 = [
        { src: "/lock.png", alt: "" },
        { src: "/lock.png", alt: "" },
        { src: "/pencil.png", alt: "" },
        { src: "/bicycle.png", alt: "" },
        { src: "/lock.png", alt: "" },
    ];

    return (
        <div className="flex flex-col items-center h-screen pb-5 bg-orange-50">
            <div
                className="flex flex-col px-7 pb-2.5 mt-14 max-w-full text-base text-center whitespace-nowrap bg-gray-200 rounded-3xl border-solid border-[3px] border-black border-opacity-20 text-black text-opacity-50 w-[211px] max-md:px-5 max-md:mt-10">
                <Image
                    src="horse.png"
                    alt=""
                    className="z-10 self-center mt-5 max-w-full aspect-[1.27] w-[124px]"
                />
                <div className="flex gap-4 mt-2">
                    {/*<Image*/}
                    {/*    src="https://cdn.builder.io/api/v1/image/assets/TEMP/ccf29268091e8cbb41274876a9856277dc785b646c81fba2b0d90e43d45f3603?apiKey=55fe86bc67304da89306af8600007521&"*/}
                    {/*    alt=""*/}
                    {/*    className="shrink-0 max-w-full aspect-[4] w-[107px]"*/}
                    {/*/>*/}
                    <svg className="shrink-0 max-w-full aspect-[4] w-[107px]" width="107" height="27" viewBox="0 0 107 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="6" y="12" width="101" height="14" rx="7" fill="#C4C4C4"/>
                        <rect x="6" y="12" width="34" height="14" rx="7" fill="#ECC055"/>
                        <path d="M15.5 0L22.3889 13.5L31 4.5L27.5556 27H3.44444L0 4.5L8.61111 13.5L15.5 0Z"
                              fill="#ECC055" stroke="#E9E8E8" stroke-width="2" stroke-linecap="round"
                              stroke-linejoin="round"/>
                    </svg>
                    <Text className="self-start mt-3.5">3/40</Text>
                </div>
            </div>
            {/*<Image*/}
            {/*    src="https://cdn.builder.io/api/v1/image/assets/TEMP/441f5a7be36a8cf81e661639288dc5e61b3fdae404b448950d0c7163acbbcfbf?apiKey=55fe86bc67304da89306af8600007521&"*/}
            {/*    alt=""*/}
            {/*    className="mt-8 max-w-full aspect-square w-[140px]"*/}
            {/*/>*/}
            <div className="flex gap-4 mt-10 ml-14">
                {images1.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="shrink-0 max-w-full aspect-square w-[140px]"
                    />
                ))}
            </div>
            <div className="flex gap-4 mt-10 mr-14">
                {images2.map((image, index) => (
                    <Image
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="shrink-0 max-w-full aspect-square w-[140px]"
                    />
                ))}
            </div>
            {/*<Image*/}
            {/*    src="https://cdn.builder.io/api/v1/image/assets/TEMP/fff9db0b2fea04add0fa166707d9fcced4c8c11c1509823af0f1004cae14c65b?apiKey=55fe86bc67304da89306af8600007521&"*/}
            {/*    alt=""*/}
            {/*    className="mt-10 max-w-full aspect-square w-[140px]"*/}
            {/*/>*/}
            <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8a99532ffa282e384188b899686dbafffe0b28b80fe7e6a9900d611cef6852d7?apiKey=55fe86bc67304da89306af8600007521&"
                alt="Decorative element"
                className="mt-14 max-w-full aspect-[5.26] w-[377px] max-md:mt-10"
            />
        </div>
    );
};

export default MyComponent;