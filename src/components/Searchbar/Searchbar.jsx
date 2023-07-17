import { SearchbarHeader, SearchbarForm, SearchbarButton, SearchbarInput } from "./Searchbar-style"



export const Searchbar = ({ handleSubmit, }) => {
    return (
        <SearchbarHeader className="searchbar">
            <SearchbarForm  onSubmit={handleSubmit}>
                <SearchbarButton type="submit" className="button"></SearchbarButton>

                <SearchbarInput
                    className="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
              
                />
            </SearchbarForm>
        </SearchbarHeader>
    )
}