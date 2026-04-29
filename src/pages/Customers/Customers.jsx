import { CircleUser, Delete, Edit, Eye, Plus, Trash } from 'lucide-react';
import SectionsHeader from '../../components/UI/SectionsHeader';
import classes from './Customers.module.css';
import SearchItem from '../../components/UI/SearchItem';
import TableItem from '../../components/UI/Table';
import { useEffect, useState } from 'react';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import Modal from '../../components/UI/Modal';

export default function CustomersPage() {
    const [customers,setCustomers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [submitting,setSubmitting] = useState(false);
    const [modalOpen,setModalOpen] = useState(false);
    const [search,setSearch] = useState('');
    const [formData,setFormData] = useState({ id: null, name: '', phone: '', email: '', address: '' });
    const [customerPayments,setCustomerPayments] = useState([]);

    async function fetchData() {
        try{
            const {data} = await api.get('/customers');
            setCustomers(data);
        }catch(error) {
            console.log(error);
        }finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    },[]);

    function handleOpenModal(item = null) {
        if(item) setFormData(item);
        else setFormData({ id: null, name: '', phone: '', email: '', address: '' });
        setModalOpen(true);
    };

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitting(true);
        try {
            if(formData.id) {
                await api.put(`/customers/${formData.id}`, formData);
                toast.success('تم التعديل بنجاح',{position: 'bottom-right',autoClose:2000});
            }else {
                await api.put('/customers', formData);
                setModalOpen(false);
                fetchData();
                toast.success('تم الحفظ بنجاح',{position: 'bottom-right',autoClose:2000});
            }
        }catch(error) {
            toast.error('حدث خطأ');
        }finally {
            setSubmitting(false);
        }
    };

    async function handleDelete(id) {
        try {
            await api.delete(`/customers/${id}`);
            fetchData();
            toast.success('تم الحذف بنجاح',{position: 'bottom-right',autoClose: 2000});
        }catch(error) {
            toast.error('حدث خطأ');
        }
    };

    return(
        <div className={classes.customers}>
            <SectionsHeader title='إدارة العملاء' description='إدارة بيانات عملائك ومديونياتهم'>
                <button className={'btn-primary ' + classes.btn}><Plus /> اضافة عميل</button>
            </SectionsHeader>
            <SearchItem>
                <input className='inp-primary' type="text" id="customersSearch" placeholder='* اسم العميل' />
            </SearchItem>
            <TableItem>
                <thead>
                    <tr>
                        <th>الاسم</th>
                        <th>رقم الهاتف</th>
                        <th>البريد الإلكتروني</th>
                        <th>العنوان</th>
                        <th>المديونية (آجل)</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => {
                        console.log(customer)
                        return (
                        <tr key={customer.id}>
                            <td>
                                <div className={classes.custName}>
                                    <CircleUser />
                                    <span>{customer.name}</span>
                                </div>
                            </td>
                            <td>{customer.phone}</td>
                            <td className={classes.tdOverFlow}>{customer.email}</td>
                            <td>{customer.address}</td>
                            <td>{customer.balance}</td>
                            <td>
                                <div className='actionsCell'>
                                    <button className={`btn edit`}><Eye size={18} /></button>
                                    <button className={`btn edit`}><Edit size={18} /></button>
                                    <button className={`btn delete`} onClick={() => handleDelete(customer.id)}><Trash size={18} /></button>
                                </div>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </TableItem>
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title='إضافة عميل'>
                <form onSubmit={handleSubmit}>

                </form>
            </Modal>
        </div>
    )
}