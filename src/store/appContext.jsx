import { createContext, useEffect, useState } from "react";

export const AppContext = createContext({
    storeName: '',
    regNumber: '',
    taxRate: 0,
    currency: "SAR",
    saveData: () => {},
    products: [],
    addProduct: () => {}
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
    const [products,setProducts] = useState([
        {
            sku: 'Ml-1',
            image: 'data:image/jpeg;base64,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',
            productName: 'لبن',
            category: 'البان',
            price: 12,
            cost: 10,
            Inventory: 100,
            procedures: 'mm'
        },
        {
            sku: 'Ml-1',
            image: '',
            productName: 'لبن',
            category: 'البان',
            price: 12,
            cost: 10,
            Inventory: 9,
            procedures: 'mm'
        },
    ]);
    
    useEffect(() => {
        localStorage.setItem('settings',JSON.stringify(settingData));
    },[settingData]);

    function handleSaveData(newData) {
        setSettingData((prev) => ({...prev,...newData}));
    }

    function handleAddProduct(newProduct) {
        setProducts((prev) => ({...prev,newProduct}));
    }
    
    const ctxValue = {
        ...settingData,
        saveData: handleSaveData,
        products,
        addProduct: handleAddProduct
    }
    return(
        <AppContext.Provider value={ctxValue}>
            {children}
        </AppContext.Provider>
    )
}