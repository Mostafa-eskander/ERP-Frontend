import classes from './SectionsHeader.module.css';

export default function SectionsHeader({children,title,description}) {
    return(
        <div className={classes.sectionHeader}>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            {children}
        </div>
    )
}