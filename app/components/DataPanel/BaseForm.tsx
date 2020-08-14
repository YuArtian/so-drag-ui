import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  })
);

export default function BaseForm(): JSX.Element {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form
      className={classes.root}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        inputRef={register({
          required: 'no email is dame',
          maxLength: { value: 10, message: 'too long' },
        })}
        error={Boolean(errors.email)}
        variant="outlined"
        margin="normal"
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        helperText={errors.email ? errors.email.message : 'input your email'}
        autoFocus
      />
    </form>
  );
}
