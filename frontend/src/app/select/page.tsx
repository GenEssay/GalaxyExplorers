'use client'

import * as React from "react";

interface BoxProps {
    children: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ children }) => {
    const handleClick = () => {

    }

    return (
        <div
            onClick={handleClick}
            className="grow justify-center items-center px-16 pt-12 pb-12 w-full text-base font-medium text-center bg-white rounded-2xl border-2 border-solid shadow-sm border-neutral-200 text-neutral-600 max-md:px-5 max-md:mt-4">
            {children}
        </div>
    );
};

const MyComponent: React.FC = () => {
//box可以直接一组一组地读，等后端调通了改
    const boxes = [
        { id: 1, text: "Say hi to teachers" },
        { id: 2, text: "Play with classmate" },
        { id: 3, text: "Cry & want to go home" },
        { id: 4, text: "Be late at school" },
    ];

    return (
        <div className="flex flex-col items-center px-8 py-12 bg-orange-50 max-md:px-5">
            <div className="flex gap-5 justify-between items-start self-stretch max-md:flex-wrap max-md:max-w-full">
                <svg width="31" height="19" viewBox="0 0 31 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 9.5L12.5 16.5M4 9.5L12.5 2M4 9.5H29" stroke="#8A650B" stroke-width="4"
                          stroke-linecap="round"/>
                </svg>
                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M20.5601 19.9328C20.256 20.5551 19.4709 20.763 18.8987 20.373C18.3264 19.983 18.2327 19.1763 18.7005 18.6656C20.1431 16.4349 20.1431 13.5653 18.7005 11.3345C18.2327 10.8238 18.3264 10.0171 18.8987 9.62707C19.4709 9.23707 20.256 9.44509 20.5601 10.0672M26.034 4.84109C30.7749 10.7843 30.7749 19.2159 26.034 25.159C25.6667 25.7019 24.9154 25.8183 24.4009 25.4121C23.8865 25.0059 23.8253 24.2482 24.2681 23.7648C28.2871 18.6128 28.2871 11.3874 24.2681 6.23523C23.8253 5.75183 23.8865 4.99412 24.4009 4.58804C24.9155 4.18191 25.6667 4.29832 26.034 4.84109ZM7.02115 20.5056C9.31434 22.3254 11.6074 24.1454 13.9006 25.9653C14.5887 26.5115 15.6033 26.0213 15.6033 25.1428V4.85728C15.6033 3.97871 14.5887 3.48875 13.9006 4.03485L7.02115 9.49456H1.50016C0.920253 9.49456 0.450195 9.96467 0.450195 10.5446V19.4556C0.450195 20.0354 0.920253 20.5056 1.50016 20.5056L7.02115 20.5056ZM2.7002 18.2556V11.7445H7.80553L13.3534 7.34166V22.6585L7.80553 18.2556H2.7002V18.2556ZM20.3772 9.79878C22.5841 12.9152 22.5841 17.085 20.3772 20.2014V9.79878Z"
                        fill="#231815"/>
                </svg>
            </div>
            <img loading="lazy"
                 src="/select_demo.jpg"
                 alt="" className="max-w-full aspect-[1.49] w-[278px]"/>
            <div className="mt-14 max-w-full w-[573px] max-md:mt-10">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {boxes.slice(0, 2).map((box) => (
                        <div key={box.id} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <Box>{box.text}</Box>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-4 max-w-full w-[573px]">
                <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {boxes.slice(2).map((box) => (
                        <div key={box.id} className="flex flex-col w-6/12 max-md:ml-0 max-md:w-full">
                            <Box>{box.text}</Box>
                        </div>
                    ))}
                </div>
            </div>
            {/*<div className="shrink-0 mt-9 max-w-full bg-orange-400 rounded-3xl h-[58px] w-[316px]" />*/}
            <Button />
        </div>
    );
};

export default MyComponent;

const Button: React.FC = () => {
    const handleClick = () => {
        console.log("Button clicked!");
    };

    return (
        <button
            onClick={handleClick}
            className="font-medium text-base text-center  shrink-0 self-center mt-20 max-w-full bg-orange-400 rounded-3xl h-[58px] w-[316px] max-md:mt-10"
            role="presentation"
        >
            Select role to login
        </button>
    );
};