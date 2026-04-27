import classes from './SearchItem.module.css';

export default function SearchItem({children}) {
    return(
        <div className={classes.searchItem}>
            {children}
        </div>
    )
}