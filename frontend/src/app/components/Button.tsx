import React from "react"

export const Button = ({ children, onClick }: {
    children: React.ReactNode,
    onClick: React.MouseEventHandler<HTMLButtonElement>
}) => {
    return (
        <button 
            onClick={onClick} 
            type="button" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
            {children}
        </button>
    );
}