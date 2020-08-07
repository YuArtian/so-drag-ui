import React from 'react';
import { useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

export default function SoHeaderForm({ defaultData, handleDataChange }) {
  console.log('SoHeaderForm render', defaultData);
  const { register, handleSubmit, errors, trigger } = useForm(); // initialise the hook
  const onSubmit = (data) => {
    console.log(data);
  };
  const handleFormChange = async (e, formItem) => {
    const { value } = e.target;
    const result = await trigger();
    if (result) {
      // 同步到 store
      handleDataChange({ [formItem]: value });
    }
  };
  // <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
  return (
    <form noValidate autoComplete="off">
      <TextField
        inputRef={register({
          required: '必须要有一个标题',
          maxLength: { value: 10, message: '不要超过10个字' },
        })}
        inputProps={{ value: defaultData?.title }}
        error={Boolean(errors.title)}
        variant="outlined"
        margin="normal"
        fullWidth
        id="title"
        label="设置标题"
        name="title"
        helperText={errors.title ? errors.title.message : ''}
        autoFocus
        onChange={(e) => handleFormChange(e, 'title')}
      />
      {/* <Button type="submit" fullWidth variant="contained" color="primary">
        提交
      </Button> */}
    </form>
  );
}
