import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default function SoGapForm({ defaultData, handleDataChange }) {
  const { register, handleSubmit, errors } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <TextField
        inputRef={register({
          required: '必须要有一个背景颜色',
          // maxLength: { value: 10, message: '太长了' },
        })}
        error={Boolean(errors.bgc)}
        variant="outlined"
        margin="normal"
        fullWidth
        id="bgc"
        label="设置背景颜色"
        name="bgc"
        helperText={errors.bgc ? errors.bgc.message : '输入色值'}
        autoFocus
      />
      <Button type="submit" fullWidth variant="contained" color="primary">
        提交
      </Button>
    </form>
  );
}
