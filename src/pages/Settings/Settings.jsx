import { Save, Settings } from "lucide-react";
import { toast } from "react-toastify";
import { useContext, useEffect, useState } from "react";

import SectionsHeader from "../../components/UI/SectionsHeader";
import classes from './Settings.module.css';
import { AppContext } from "../../store/appContext";

export default function SettingsPage() {
    const { storeName, regNumber, taxRate, currency, saveData } = useContext(AppContext);

    const [formInfo,setFormInfo] = useState ({
        storeName,
        regNumber,
        taxRate,
        currency,
    });
    
    function handleSave(e) {
        e.preventDefault();
        saveData(formInfo);
        toast.success('تم الحفظ',{position: "bottom-right",autoClose: 2000})
    }

    return(
        <div>
            <SectionsHeader title='إعدادات النظام' description='تخصيص الخيارات الأساسية للمتجر' />
            <div className={classes.form}>
                <div className={classes.title}>
                    <Settings />
                    <h2>الإعدادات العامة</h2>
                </div>
                <form className={classes.formData} onSubmit={handleSave}>
                    <p className={classes.storeN}>
                        <label htmlFor="storeName">اسم المتجر / الشركة</label>
                        <input type="text" className="inp-primary" value={formInfo.storeName} onChange={(e) => setFormInfo((prev) => ({...prev,storeName: e.target.value}))} id="storeName" name="storeName" />
                    </p>
                    <div className={classes.groupRow}>
                        <p className={classes.groupItem}>
                            <label htmlFor="regNumber">رقم السجل التجاري / الضريبي</label>
                            <input type="text" className="inp-primary" value={formInfo.regNumber} onChange={(e) => setFormInfo((prev) => ({...prev,regNumber: e.target.value}))} id="regNumber" name="regNumber" />
                        </p>
                        <p className={classes.groupItem}>
                            <label htmlFor="taxRate">الضريبة المضافة (%)</label>
                            <input type="number" className="inp-primary" value={formInfo.taxRate} onChange={(e) => setFormInfo((prev) => ({...prev,taxRate: Number(e.target.value)}))} id="taxRate" name="taxRate" />
                        </p>
                    </div>
                    <p className={classes.curInp}>
                        <label htmlFor="currency">العملة الافتراضية</label>
                        <select value={formInfo.currency} className="inp-primary" onChange={(e) => setFormInfo((prev) => ({...prev,currency: e.target.value}))} id="currency" name="currency">
                            <option value="SAR">ريال سعودي (SAR)</option>
                            <option value="USD">دولار امريكي (USD)</option>
                            <option value="EGP">جنيه مصري (EGP)</option>
                        </select>
                    </p>

                    <button type='submit' className="btn-primary">
                        <Save size={18} /> حفظ
                    </button>
                </form>
            </div>
        </div>
    )
}