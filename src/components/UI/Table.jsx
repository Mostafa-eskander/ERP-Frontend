import classes from './Table.module.css';

export default function TableItem({children}) {
    return(
        <div className={classes.table}>
            <table className={classes.tableData}>
                {children}
            </table>
        </div>
    )
}