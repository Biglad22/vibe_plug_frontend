import React, { ReactNode } from "react";

type Props = {
    children: ReactNode;
    className?: string;
};

export default function Divider({ children, className = "" }: Props) {
    return (
        <div
            className={`${className} capitalize text-xs sm:text-sm flex gap-2 font-medium items-center-safe`}
        >
            <hr className="bg-medium flex-1" />
            {children}
            <hr className="bg-medium flex-1" />
        </div>
    );
}
