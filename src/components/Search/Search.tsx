import { Button, TextField } from '@mui/material';
import { FormikProps } from 'formik';

interface IProps{
    label: string;
    value: string;
    disabled?: boolean;
    name: string;
    error?: boolean;
    helperText?: string;
}

export const Search = ({
    handleSubmit,
    handleChange,
    disabled,
    label,
    value,
    name,
    error,
    helperText,
    ...rest
}: IProps & Partial<FormikProps<any>>) => {
    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                id="username"
                name={name}
                label={label}
                value={value}
                onChange={handleChange}
                error={error}
                helperText={helperText}
                {...rest}
            />
            <Button
                disabled={disabled}
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
            >
                Search
            </Button>
        </form>
    );
};

export default Search;
