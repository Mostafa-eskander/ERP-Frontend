import { useEffect } from "react";
import { X } from "lucide-react";

import classes from './Modal.module.css';

export default function Modal({isOpen,onClose,title,children}) {
    useEffect(() => {
        if(isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => {document.body.style.overflow = 'unset'};
    },[isOpen]);
    
    if(!isOpen) return null; 
    return(
        <div className={classes.modalOverlay} onClick={onClose}>
            <div className={classes.modalContent} onClick={e => e.stopPropagation()}>
                <div className={classes.modalHeader}>
                    <h2>{title}</h2>
                    <button className="closeModal" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>
                <div className={classes.modalBody}>
                    {children}
                </div>
            </div>
        </div>
    )
}