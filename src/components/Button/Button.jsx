import { ButtonLoadMore } from "./Button-style"


export const Button = ({ handleClick }) => {
    return (
        <>
            <ButtonLoadMore type="button" onClick={handleClick}>Load More</ButtonLoadMore>
        </>
    )
}