import classes from './SearchItem.module.css';

export default function SearchItem({placeholder}) {
    return(
        <div className={classes.searchItem}>
            <input type="text" className="inp-primary" name="inpSearch" id="inpSearch" placeholder={placeholder} />
        </div>
    )
}