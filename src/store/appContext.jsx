import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({
    storeName: '',
    regNumber: '',
    taxRate: 0,
    currency: "SAR",
    saveData: () => {}
});

export default function AppContextProvider({children}) {
    const [settingData,setSettingData] = useState(() => {
        const savedData = localStorage.getItem('settings');
        return savedData ? JSON.parse(savedData) : {
            storeName: '',
            regNumber: '',
            taxRate: 0,
            currency: "SAR"
        };
    });
    
    useEffect(() => {
        localStorage.setItem('settings',JSON.stringify(settingData));
    },[settingData]);

    function handleSaveData(newData) {
        setSettingData((prev) => ({...prev,...newData}));
    }
    
    const ctxValue = {
        ...settingData,
        saveData: handleSaveData
    }
    return(
        <AppContext.Provider value={ctxValue}>
            {children}
        </AppContext.Provider>
    )
}