import utilStyles from "../styles/utils.module.css";

export default function Form({ children, onSubmit }) {
    return <>
        <form onSubmit={onSubmit}>
            {children}
        </form>
    </>
}