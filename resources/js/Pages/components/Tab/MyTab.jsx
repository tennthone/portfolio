import React from "react";
import { useState } from "react";

export const MyTab = ({children}) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = (index) => {
        setActiveTab(index);
    };

    return (
        <div className="mt-5">
            <div className="tabs flex">
                {React.Children.map(children, (child, index) =>
                    React.cloneElement(child, {
                        active: index === activeTab,
                        onClick: () => handleTabClick(index),
                    })
                )}
            </div>
            <div className="tab-content">
                {React.Children.toArray(children)[activeTab].props.children}
            </div>
        </div>
    );
};

export const MyTabItem = ({ title, icon, active, onClick }) => {
    const activeTab = 'border-b-2 border-indigo-600 text-indigo-600' 
    return (
        <div className={`tab cursor-pointer text-md font-bold pb-4 ${active ? activeTab : "hover:border-b-2 hover:border-slate-300"} mb-3 me-3 `} onClick={onClick}>
            <div className="flex items-center justify-center">
                <span className="me-2">{icon}</span>
                <span> {title}</span>
            </div>
        </div>
    );
};
