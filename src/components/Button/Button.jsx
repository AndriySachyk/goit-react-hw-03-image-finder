import { ButtonLoadMore } from "./Button-style"


export const Button = ({ handleClick }) => {
    return (
        <>
            <ButtonLoadMore onClick={handleClick}>Load More</ButtonLoadMore>
        </>
    )
}