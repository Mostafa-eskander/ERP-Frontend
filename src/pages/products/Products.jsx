import { Edit, Package, Plus, Trash } from 'lucide-react';

import classes from './Products.module.css';
import SectionsHeader from '../../components/UI/SectionsHeader';
import SearchItem from '../../components/UI/SearchItem';
import TableItem from '../../components/UI/Table';

export default function ProductsPage() {
    const products = []
    
    return (
        <div className={classes.producs}>
            <SectionsHeader 
                title="إدارة المنتجات" 
                description='أضف بضائعك، تتبع الكميات ولون مخزونك.'
            >
                <button className='btn-primary'><Plus /> إضافه منتج جديد</button>
            </SectionsHeader>
            <SearchItem placeholder="البحث بالاسم أو رمز SKU"/>
            <TableItem>
                <thead>
                        <tr>
                            <th className={classes.code}>رمز (SKU/Barcode)</th>
                            <th>الصورة</th>
                            <th>اسم المنتج</th>
                            <th>القسم</th>
                            <th>السعر ($)</th>
                            <th>التكلفة ($)</th>
                            <th>المخزون</th>
                            <th>الإجراءات</th>
                        </tr>
                </thead>
                <tbody>
                    {products.map((product) =>{ 
                            const inv = Number(product.Inventory) < 10;
                            const image = product.image === '' || product.image === undefined || product.image === null;
                            return(
                                <tr key={product.sku}>
                                    <td><span className={classes.badge}>{product.sku}</span></td>
                                    <td>
                                        {!image ? (
                                            <img src={product.image} alt={product.name} className={classes.image} />
                                        ) : (
                                            <div className={`${classes.imageIcon} ${classes.image}`}></div>    
                                        )
                                        }
                                    </td>
                                    <td>
                                        <div className={classes.productName}>
                                            <Package size={18} />
                                            <strong>{product.productName}</strong>
                                        </div>
                                    </td>
                                    <td>{product.category || 'No Category' }</td>
                                    <td className={classes.price}>{product.price}</td>
                                    <td className={classes}>{product.cost}</td>
                                    <td className={classes.inventory}>
                                        <span className={inv ? classes.invDanger : classes.inv}>{product.Inventory}</span>
                                    </td>
                                    <td>
                                        <div className={classes.actionsCell}>
                                            <button className={`btn ${classes.edit}`}><Edit size={18} /></button>
                                            <button className={`btn ${classes.delete}`}><Trash size={18} /></button>
                                        </div>
                                    </td>
                                </tr>
                            )
                    })}
                </tbody>
            </TableItem>
        </div>
    )
}