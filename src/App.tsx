import { Input } from '@/components/common/Input';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

function App() {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      join: ''
    },
    mode: 'onChange'
  });

  useEffect(() => {
    console.log(errors.join);
  }, [errors]);

  return (
    <div>
      <Input
        {...register('join', { required: 'hihii', maxLength: 15 })}
        value={watch('join')}
        setValue={() => setValue('join', '')}
        height={92}
        type="default"
        multiline
        maxLength={15}
        isError={errors.join ? true : false}
        errorText={errors.join?.message as string}
      />
      <Input
        {...register('join', { required: 'hihii', maxLength: 15 })}
        value={watch('join')}
        setValue={() => setValue('join', '')}
        height={92}
        type="meeting"
        multiline
        maxLength={15}
        isError={errors.join ? true : false}
        errorText={errors.join?.message as string}
      />
    </div>
  );
}

export default App;
